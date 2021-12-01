import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera as ExpoCamera, CameraCapturedPicture } from "expo-camera";

import { CapturedPicture } from "expo-camera/build/Camera.types";
import { useNavigation } from "@react-navigation/core";
import { ScreenProps } from "../routes/app.stack.routes";

type Props = ScreenProps<"camera">;

function Camera({ route }: Props) {
  const { save } = route.params;
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const camRef = useRef<ExpoCamera>();

  const snap = async () => {
    if (camRef.current) {
      let photo = await new Promise(
        async (resolve: (picture: CameraCapturedPicture) => void) => {
          await camRef.current?.takePictureAsync({
            onPictureSaved: resolve,
            skipProcessing: true,
            quality: 0.5,
          });
          camRef.current?.pausePreview();
        }
      );
      camRef.current.resumePreview();

      setPhoto(photo);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function discardPhoto() {
    setPhoto(undefined);
  }

  function handleSave(photo: CameraCapturedPicture) {
    save(photo);
    navigation.goBack();
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>;
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFF",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        {photo && (
          <PhotoView
            savePhoto={handleSave}
            photo={photo}
            discardPhoto={discardPhoto}
          />
        )}

        <ExpoCamera ref={camRef} style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === ExpoCamera.Constants.Type.back
                    ? ExpoCamera.Constants.Type.front
                    : ExpoCamera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}>Virar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={snap}>
              <Text style={styles.text}>Capturar</Text>
            </TouchableOpacity>
          </View>
        </ExpoCamera>
      </View>
    </View>
  );
}

interface PhotoViewProps {
  photo: CapturedPicture;
  savePhoto: (photo: CapturedPicture) => void;
  discardPhoto: () => void;
}

function PhotoView({ photo, savePhoto, discardPhoto }: PhotoViewProps) {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          flexDirection: "column-reverse",
        }}
        source={{ uri: photo.uri }}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-end", margin: 25 }}
          onPress={() => savePhoto(photo)}
        >
          <Text style={styles.text}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "flex-end", margin: 25 }}
          onPress={discardPhoto}
        >
          <Text style={styles.text}>Descartar</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
export { Camera };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
