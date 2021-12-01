import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { AppTabRoutes, TabsRouteParams } from "./app.tab.routes";
import { Drawer } from "../components/Drawer";
import { NavBar } from "../components/Navbar";

import React from "react";

export type DrawerRouteParams = {
  tabs?: TabsRouteParams;
};

export type ScreenDrawerProps<RouteName extends keyof DrawerRouteParams> =
  DrawerScreenProps<DrawerRouteParams, RouteName>;

const { Navigator, Screen } = createDrawerNavigator<DrawerRouteParams>();

function renderDrawer() {
  return <Drawer />;
}

export function AppDrawerRoutes() {
  return (
    <Navigator initialRouteName="tabs" drawerContent={renderDrawer}>
      <Screen
        name="tabs"
        component={AppTabRoutes}
        options={(props) => ({
          headerShown: true,
          header: () => <NavBar {...props} />,
        })}
      />
    </Navigator>
  );
}
