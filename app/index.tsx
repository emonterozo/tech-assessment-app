import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { ButtonField, FormConfig } from "@/types/types";

const formConfig: FormConfig = {
  Title: "Tech assessment",
  Subtitle: "Eric Monterozo",
  Fields: [
    {
      Type: "H1",
      Text: "Person name",
    },
    {
      ID: "person-name",
      Type: "Text",
      Placeholder: "John Smith",
    },
    {
      ID: "hello-button",
      Type: "Button",
      Title: "Say hi",
      AlertMessage: "Hello ${person-name}",
    },
  ],
};

export default function Index() {
  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    const initialData: Record<string, string> = {};
    formConfig.Fields.forEach((field) => {
      if (field.Type === "Text") {
        initialData[field.ID] = "";
      }
    });
    setFormData(initialData);
  }, []);

  const handleChange = (id: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleButtonPress = (field: ButtonField) => {
    const regex = /\$\{([^}]+)\}/;

    const match = regex.exec(field.AlertMessage);

    if (match) {
      const variable = match[1];
      const before = field.AlertMessage.substring(0, match.index);
      const after = field.AlertMessage.substring(match.index + match[0].length);

      Alert.alert(`${before}${formData[variable]}${after}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subTitle}>{formConfig.Subtitle}</Text>
      {formConfig.Fields.map((field, index) => {
        if (field.Type === "H1") {
          return (
            <Text key={field.Text} style={styles.label}>
              {field.Text}
            </Text>
          );
        }

        if (field.Type === "Text") {
          return (
            <TextInput
              key={field.ID}
              style={styles.input}
              placeholder={field.Placeholder}
              value={formData[field.ID]}
              onChangeText={(text) => handleChange(field.ID, text)}
            />
          );
        }

        if (field.Type === "Button") {
          return (
            <View key={field.ID} style={styles.buttonContainer}>
              <Button
                title={field.Title}
                onPress={() => handleButtonPress(field)}
              />
            </View>
          );
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: "#696969",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#8A8989",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
