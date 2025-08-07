// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const frequencyOptions = ["Щомісяця", "Щороку"];

// function ExpenseInput({ title, fields, data, onChange, isLast }) {
//   const [openField, setOpenField] = useState(null);

//   const toggleDropdown = (fieldKey) => {
//     setOpenField(openField === fieldKey ? null : fieldKey);
//   };

//   return (
//     <View style={[styles.sectionContainer, isLast && styles.lastSection]}>
//       <Text style={styles.sectionTitle}>{title}</Text>

//       {fields.map((fieldKey) => {
//         const selected = data[fieldKey]?.frequency || "Щомісяця";
//         const options = frequencyOptions.filter((opt) => opt !== selected);

//         return (
//           <View key={fieldKey} style={styles.inputRow}>
//             <Text style={styles.label}>{fieldKey}</Text>

//             <TextInput
//               style={styles.input}
//               keyboardType="numeric"
//               value={data[fieldKey]?.value ?? ""}
//               onChangeText={(val) => onChange(fieldKey, "value", val)}
//             />

//             <View style={styles.pickerWrapper}>
//               <TouchableOpacity
//                 style={styles.frequencyBox}
//                 onPress={() => toggleDropdown(fieldKey)}
//               >
//                 <Text style={styles.frequencyText}>{selected}</Text>
//                 <Ionicons name="chevron-down" size={16} color="#555" />
//               </TouchableOpacity>

//               {openField === fieldKey && (
//                 <View style={styles.dropdown}>
//                   {options.map((option) => (
//                     <TouchableOpacity
//                       key={option}
//                       onPress={() => {
//                         onChange(fieldKey, "frequency", option);
//                         setOpenField(null);
//                       }}
//                       style={styles.dropdownItem}
//                     >
//                       <Text style={styles.dropdownText}>{option}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               )}
//             </View>
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
//     zIndex: 999,
//     shadowColor: "#000",
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
// });

// export default ExpenseInput;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const frequencyOptions = ["Щомісяця", "Щороку"];

function ExpenseInput({ title, fields, data, onChange, isLast, readOnly }) {
  const [openField, setOpenField] = useState(null);

  const toggleDropdown = (fieldKey) => {
    setOpenField(openField === fieldKey ? null : fieldKey);
  };

  return (
    <View style={[styles.sectionContainer, isLast && styles.lastSection]}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {fields.map((fieldKey) => {
        const selected = data[fieldKey]?.frequency || "Щомісяця";
        const value = data[fieldKey]?.value;

        return (
          <View key={fieldKey} style={readOnly ? styles.readOnlyRow : styles.inputRow}>
            <Text style={styles.label}>{fieldKey}</Text>

            {readOnly ? (
              <View style={styles.valueContainer}>
                <Text style={styles.readOnlyValue}>
                  {parseFloat(value || 0).toLocaleString("uk-UA")}
                </Text>
                <Text style={styles.readOnlyFrequency}>
                  {selected === "Щороку" ? "Раз в год" : "Ежемесячно"}
                </Text>
              </View>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={value}
                  onChangeText={(val) => onChange(fieldKey, "value", val)}
                />

                <View style={styles.pickerWrapper}>
                  <TouchableOpacity
                    style={styles.frequencyBox}
                    onPress={() => toggleDropdown(fieldKey)}
                  >
                    <Text style={styles.frequencyText}>{selected}</Text>
                    <Ionicons name="chevron-down" size={16} color="#555" />
                  </TouchableOpacity>

                  {openField === fieldKey && (
                    <View style={styles.dropdown}>
                      {frequencyOptions
                        .filter((opt) => opt !== selected)
                        .map((option) => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => {
                              onChange(fieldKey, "frequency", option);
                              setOpenField(null);
                            }}
                            style={styles.dropdownItem}
                          >
                            <Text style={styles.dropdownText}>{option}</Text>
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
  sectionContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 12,
  },
  lastSection: {
    borderBottomWidth: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  readOnlyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    flex: 1.5,
    fontSize: 14,
    color: "#333",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 3,
    marginRight: 6,
    backgroundColor: "white",
    fontSize: 14,
  },
  pickerWrapper: {
    flex: 1.7,
    position: "relative",
  },
  frequencyBox: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 6,
    backgroundColor: "white",
    paddingHorizontal: 10,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  frequencyText: {
    fontSize: 14,
    color: "#333",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  valueContainer: {
    alignItems: "flex-end",
    flex: 2,
  },
  readOnlyValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  readOnlyFrequency: {
    fontSize: 13,
    color: "#888",
  },
});

export default ExpenseInput;
