import React from 'react'

import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur';
import { SafeAreaView, View } from 'react-native';
const RootComponent = ({ children }) => {
    return (
        <LinearGradient
            start={{ x: 0.1, y: 0.2 }}
            end={{ x: 0.9, y: 0.8 }}
            // Button Linear Gradient
            colors={['#2b2b29', '#1c0b04', '#421403']}
            style={{ flex: 1 }}>
            <BlurView
                tint='dark'
                intensity={80} style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{
                        flex: 1, position: "relative",
                        // paddingHorizontal: 20, paddingTop: 20
                    }}>
                        {children}
                    </View>
                </SafeAreaView>
            </BlurView>
        </LinearGradient>
    )
}

export default RootComponent