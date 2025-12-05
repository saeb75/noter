import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Test = () => {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const audioPlayer = useAudioPlayer(recordedUri);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();

    const uri = audioRecorder.uri;
    setRecordedUri(uri);
    console.log(recordedUri);
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  const playandpouse = () => {
    console.log("mmm");
    if (audioPlayer.isLoaded) {
      console.log("ok");
      if (audioPlayer.playing) {
        audioPlayer.pause();
        console.log("pause");
      } else {
        audioPlayer.play();
        console.log("play");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={recorderState.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recorderState.isRecording ? stopRecording : record}
      />
      <TouchableOpacity
        className="bg-blue-400 mt-24 w-full"
        onPress={() => playandpouse()}
      >
        <Text className="text-center text-3xl ">play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});

export default Test;
