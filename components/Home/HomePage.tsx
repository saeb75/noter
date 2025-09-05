import React, { useState } from "react";
import { View } from "react-native";
import UpgradePage from "../UpgradePage/UpgradePage";
import AddNote from "./AddNote";
import Header from "./Header";
import NewNoteOptions from "./NewNoteOptions";
import Notes from "./Notes";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
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
        <NewNoteOptions isVisible={isVisible} setIsVisible={setIsVisible} />
        <UpgradePage
          upgradePanel={UpgradePanel}
          setUpgradePanel={SetUpgradePanel}
        />
      </View>
    </>
  );
};

export default HomePage;
