import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import {  useGlobalSearchParams } from "expo-router";
import * as DB from '../../utils/db'
import Pdf from 'react-native-pdf';

import styles from './sheet.style'

const sheet = () => {
  const params = useGlobalSearchParams();

  const [pdfUri, setpdfUri] = useState(null);

  const getFilepath = async () => {
    setpdfUri(await DB.getFilepath(params.id))
  }

  useEffect(() => {
    getFilepath();
  }, []);

  return (
      <View style={styles.container}>
          <Pdf style={styles.pdf} source={{uri: pdfUri, cache: true}} />
      </View>
  );
}

export default sheet
