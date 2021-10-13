import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppTabRoutes } from "./app.tab.routes";
import { Drawer } from "../components/Drawer";
import { NavBar } from "../components/Navbar";

import React from "react";

const { Navigator, Screen } = createDrawerNavigator();

export function AppDrawerRoutes() {
  return (
    <Navigator drawerContent={(props) => <Drawer {...props} />}>
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
