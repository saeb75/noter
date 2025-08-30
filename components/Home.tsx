import React, { useState } from "react";
import { View } from "react-native";
import AddNote from "./Home/AddNote";
import Header from "./Home/Header";
import NewNoteOptions from "./Home/NewNoteOptions";
import Notes from "./Home/Notes";
import UpgradePage from "./UpgradePage/UpgradePage";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [UpgradePanel, SetUpgradePanel] = useState(false);
  return (
    <>
      <View className="flex-1 ">
        <Header UpgradePanel={UpgradePanel} setUpgradePanel={SetUpgradePanel} />
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

export default Home;
