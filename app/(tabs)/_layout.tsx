import { Tabs } from 'expo-router'
import React from 'react'

export default function Tabslayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
    </Tabs>
  )
}