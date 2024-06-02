import React, { Component } from 'react';
import { View, StyleSheet, Modal} from 'react-native';
import { COLORS } from '../common';
import { deviceWidth } from '../constants';
export default function ModalView(props) {
   return (
      <Modal
         animationType={props.animationType != null ? props.animationType : 'none'}
         animated={props.animated != null ? props.animated : false}
         visible={props.visible != null ? props.visible : false}
         transparent={props.transparent != null ? props.transparent : false}
         onRequestClose={() => props.CloseModal}>
         <View style={[styles.styles, props.style]}>
            <View style={[styles.containerstyle, props.containerstyle]}>
               {
                  props.components
               }
            </View>
         </View>

      </Modal>

   );
}
const styles = StyleSheet.create({
   styles: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.transparent,
   },
   containerstyle: {
      alignItems: 'center',
      justifyContent: 'center',
      width: deviceWidth,
      backgroundColor: COLORS.white,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 20,
      width: deviceWidth

   }
});





