import React, { useState } from "react";
import { View } from "react-native";

import UpgradePage from "../UpgradePage/UpgradePage";
import AddNote from "./AddNote";
import Header from "./Header";
import Notes from "./Notes";
type VisibleProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const HomePage: React.FC<VisibleProps> = ({ isVisible, setIsVisible }) => {
  const [UpgradePanel, SetUpgradePanel] = useState(false);
  const [SupportPanelState, SetSupportPanelState] = useState(false);

  return (
    <>
      
        <View className="flex-1 ">
          <Header
            UpgradePanel={UpgradePanel}
            setUpgradePanel={SetUpgradePanel}
            supportPanelState={SupportPanelState}
            setSupportPanelState={SetSupportPanelState}
          />
          <Notes />

          <AddNote isClick={isVisible} setIsClick={setIsVisible} />
          {/* <NewNoteOptions isVisible={isVisible} setIsVisible={setIsVisible} /> */}

          <UpgradePage
            upgradePanel={UpgradePanel}
            setUpgradePanel={SetUpgradePanel}
          />
        </View>
      
    </>
  );
};

export default HomePage;
