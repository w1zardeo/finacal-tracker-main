// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const frequencyOptions = ["Щомісяця", "Щороку"];

// function ExpenseInput({ title, fields, data, onChange, isLast, readOnly }) {
//   const [openField, setOpenField] = useState(null);

//   const toggleDropdown = (fieldKey) => {
//     setOpenField(openField === fieldKey ? null : fieldKey);
//   };

//   return (
//     <View style={[styles.sectionContainer, isLast && styles.lastSection]}>
//       <Text style={styles.sectionTitle}>{title}</Text>

//       {fields.map((fieldKey) => {
//         const selected = data[fieldKey]?.frequency || "Щомісяця";
//         const value = data[fieldKey]?.value;

//         return (
//           <View
//             key={fieldKey}
//             style={readOnly ? styles.readOnlyRow : styles.inputRow}
//           >
//             <Text style={styles.label}>{fieldKey}</Text>

//             {readOnly ? (
//               <View style={styles.valueContainerRow}>
//                 <Text style={styles.readOnlyValue}>
//                   {parseFloat(value || 0).toLocaleString("uk-UA")}
//                 </Text>
//                 <Text style={styles.readOnlyFrequency}>
//                   {selected === "Щороку" ? "Щороку" : "Щомісяця"}
//                 </Text>
//               </View>
//             ) : (
//               <>
//                 <TextInput
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={value}
//                   onChangeText={(val) => onChange(fieldKey, "value", val)}
//                 />

//                 <View style={styles.pickerWrapper}>
//                   <TouchableOpacity
//                     style={styles.frequencyBox}
//                     onPress={() => toggleDropdown(fieldKey)}
//                   >
//                     <Text style={styles.frequencyText}>{selected}</Text>
//                     <Ionicons name="chevron-down" size={16} color="#555" />
//                   </TouchableOpacity>

//                   {openField === fieldKey && (
//                     <View style={styles.dropdown}>
//                       {frequencyOptions
//                         .filter((opt) => opt !== selected)
//                         .map((option) => (
//                           <TouchableOpacity
//                             key={option}
//                             onPress={() => {
//                               onChange(fieldKey, "frequency", option);
//                               setOpenField(null);
//                             }}
//                             style={styles.dropdownItem}
//                           >
//                             <Text style={styles.dropdownText}>{option}</Text>
//                           </TouchableOpacity>
//                         ))}
//                     </View>
//                   )}
//                 </View>
//               </>
//             )}
//           </View>
//         );
//       })}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//     paddingBottom: 12,
//   },
//   lastSection: {
//     borderBottomWidth: 0,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 12,
//   },
//   inputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//     position: "relative",
//   },
//   readOnlyRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   label: {
//     flex: 1.5,
//     fontSize: 14,
//     color: "#333",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#D0D0D0",
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     borderRadius: 3,
//     marginRight: 6,
//     backgroundColor: "white",
//     fontSize: 14,
//   },
//   pickerWrapper: {
//     flex: 1.7,
//     position: "relative",
//   },
//   frequencyBox: {
//     borderWidth: 1,
//     borderColor: "#D0D0D0",
//     borderRadius: 6,
//     backgroundColor: "white",
//     paddingHorizontal: 10,
//     height: 36,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   frequencyText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   dropdown: {
//     position: "absolute",
//     top: 40,
//     width: "100%",
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#D0D0D0",
//     borderRadius: 6,
//     shadowColor: "#000",
//     zIndex: 999,
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 3,
//   },
//   dropdownItem: {
//     padding: 10,
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   valueContainer: {
//     alignItems: "flex-end",
//     flex: 2,
//   },
//   valueContainerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     flex: 2,
//   },
//   readOnlyValue: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#000",
//     marginRight: 8,
//   },
//   readOnlyFrequency: {
//     fontSize: 16,
//     color: "#888",
//     fontWeight: 500
//   },
// });

// export default ExpenseInput;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const frequencyOptions = ["Щомісяця", "Щороку"];

export default function ExpenseInput({
  title,
  fields,
  data,
  onChange,
  isLast,
  readOnly,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <View style={[styles.block, isLast && styles.lastBlock]}>
      <Text style={styles.title}>{title}</Text>

      {fields.map((name) => {
        const value = data[name]?.value || "";
        const frequency = data[name]?.frequency || "Щомісяця";

        return (
          <View key={name} style={readOnly ? styles.readOnlyRow : styles.row}>
            <Text style={styles.label}>{name}</Text>

            {readOnly ? (
              <View style={styles.readOnlyValues}>
                <Text style={styles.value}>
                  {parseFloat(value || 0).toLocaleString("uk-UA")}
                </Text>
                <Text style={styles.frequency}>{frequency}</Text>
              </View>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={(val) => onChange(name, "value", val)}
                />

                <View style={styles.dropdownWrapper}>
                  <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() =>
                      setOpenDropdown(openDropdown === name ? null : name)
                    }
                  >
                    <Text>{frequency}</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                  </TouchableOpacity>

                  {openDropdown === name && (
                    <View style={styles.dropdownList}>
                      {frequencyOptions
                        .filter((opt) => opt !== frequency)
                        .map((opt) => (
                          <TouchableOpacity
                            key={opt}
                            onPress={() => {
                              onChange(name, "frequency", opt);
                              setOpenDropdown(null);
                            }}
                          >
                            <Text style={styles.dropdownItem}>{opt}</Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  lastBlock: { borderBottomWidth: 0 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  readOnlyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { flex: 1.5, fontSize: 14 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    marginRight: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  dropdownWrapper: { flex: 1.7, position: "relative" },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownList: {
    position: "absolute",
    top: 40,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    zIndex: 999,
  },
  dropdownItem: { padding: 10, fontSize: 14 },
  readOnlyValues: { flexDirection: "row", alignItems: "center" },
  value: { fontSize: 16, fontWeight: "500", marginRight: 8 },
  frequency: { fontSize: 16, color: "#888" },
});
