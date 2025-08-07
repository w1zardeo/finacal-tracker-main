import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

function AddGoalModal({ onClose, onAddGoal, initialGoal }) {
  const [title, setTitle] = useState(initialGoal?.title || "");
  const [amount, setAmount] = useState(initialGoal?.amount || "");
  const [term, setTerm] = useState(initialGoal?.term || "");
  const [imageUri, setImageUri] = useState(initialGoal?.imageUri || null);

  useEffect(() => {
    if (initialGoal) {
      setTitle(initialGoal.title || "");
      setAmount(initialGoal.amount || "");
      setTerm(initialGoal.term || "");
      setImageUri(initialGoal.imageUri || null);
    }
  }, [initialGoal]);

  const pickImageHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddGoal = () => {
    if (title && amount && term) {
      const newGoal = {
        id: initialGoal?.id || Date.now().toString(),
        title,
        amount,
        term,
        imageUri,
        progress: initialGoal?.progress || 0,
      };
      onAddGoal(newGoal);
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.modalTitle}>Нова мета</Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={22} color="#000" />
          </Pressable>
        </View>

        <View style={styles.imageBox}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          ) : (
            <Ionicons name="image-outline" size={50} color="#99c" />
          )}
        </View>
        <Pressable style={styles.uploadButton} onPress={pickImageHandler}>
          <Text style={styles.uploadText}>Загрузити фото</Text>
          <Ionicons name="cloud-upload-outline" size={18} color="#007BFF" />
        </Pressable>

        <Text style={styles.label}>Назва мети</Text>
        <TextInput
          placeholder="Назва"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Сума мети</Text>
        <TextInput
          placeholder="Сума"
          keyboardType="numeric"
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Термін мети</Text>
        <TextInput
          placeholder="0 міс"
          keyboardType="numeric"
          style={styles.input}
          value={term}
          onChangeText={setTerm}
        />

        <Pressable style={styles.addButton} onPress={handleAddGoal}>
          <Text style={styles.addButtonText}>Добавити ціль</Text>
        </Pressable>
        <Pressable onPress={onClose}>
          <Text style={styles.cancelText}>Відмінити</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 8,
  },
  imageBox: {
    height: 100,
    backgroundColor: "#f2f4f7",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  uploadButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAF4FF",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    gap: 6,
  },
  uploadText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
});

export default AddGoalModal;
