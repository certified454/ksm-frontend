import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

type Bubble = {
  size: number;
  color: string;
  animX: Animated.Value;
  animY: Animated.Value;
  duration: number;
  delay: number;
  scale: number;
  opacity: number;
};

const COLORS = [
  "#ff7e7e",
  "#d6b946",
  "#4cec61",
  "#4D96FF",
  "#ac69ff",
  "#FF9F1C",
  "#4B0082",
];

export default function AnimatedBubbles({ count = 15 }: { count?: number }) {
  const window = Dimensions.get("window");
  const [layout, setLayout] = useState({
    width: window.width,
    height: window.height,
  });
  const bubblesRef = useRef<Bubble[]>([]);

  const initBubbles = () => {
    const { width, height } = layout;
    if (!width || !height) return;
    if (bubblesRef.current.length) return;

    const bubbles: Bubble[] = [];
    for (let i = 0; i < count; i++) {
      // Bias towards smaller bubbles using square root
      const size = Math.round(8 + Math.sqrt(Math.random()) * 25);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const initialX = Math.random() * (width - size);
      const initialY = Math.random() * (height - size);
      const animX = new Animated.Value(initialX);
      const animY = new Animated.Value(initialY);
      const duration = 3500 + Math.random() * 7000;
      const delay = Math.random() * 2200;
      const scale = 0.7 + Math.random() * 0.8;
      const opacity = 0.12 + Math.random() * 0.28;
      bubbles.push({
        size,
        color,
        animX,
        animY,
        duration,
        delay,
        scale,
        opacity,
      });
    }
    bubblesRef.current = bubbles;
    bubblesRef.current.forEach(startLoop);
  };

  const startLoop = (b: Bubble) => {
    const { width, height } = layout;
    if (!width || !height) return;
    const nextX = Math.random() * (width - b.size);
    const nextY = Math.random() * (height - b.size);
    Animated.sequence([
      Animated.delay(b.delay),
      Animated.parallel([
        Animated.timing(b.animX, {
          toValue: nextX,
          duration: b.duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(b.animY, {
          toValue: nextY,
          duration: b.duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      b.delay = Math.random() * 1800;
      b.duration = 3500 + Math.random() * 7000;
      startLoop(b);
    });
  };

  useEffect(() => {
    initBubbles();
  }, [layout.width, layout.height]);

  return (
    <View
      pointerEvents="none"
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setLayout({ width, height });
      }}
      style={StyleSheet.absoluteFill}
    >
      {bubblesRef.current.map((b, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: b.size,
            height: b.size,
            borderRadius: b.size / 2,
            backgroundColor: b.color,
            opacity: b.opacity,
            transform: [
              { translateX: b.animX },
              { translateY: b.animY },
              { scale: b.scale },
            ],
          }}
        />
      ))}
    </View>
  );
}
