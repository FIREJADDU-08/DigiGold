import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // or react-native-linear-gradient

const { width, height } = Dimensions.get('window');

const DigiGoldOnboarding = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Animation for floating particles
  const particleAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Main entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();

    // Floating particles animation
    particleAnims.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 1000),
          Animated.timing(anim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const handleGetStarted = () => {
    // Navigation logic here
    console.log('Get Started pressed');
  };

  const handleLearnMore = () => {
    // Navigation logic here
    console.log('Learn More pressed');
  };

  const logoRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const features = [
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: 'Your investments are protected with advanced encryption',
    },
    {
      icon: '💰',
      title: 'Start from ₹1',
      description: 'Begin investing in gold with as little as one rupee',
    },
    {
      icon: '📈',
      title: 'Real-time Tracking',
      description: 'Monitor your gold portfolio 24/7 with live updates',
    },
    {
      icon: '⚡',
      title: 'Instant Liquidity',
      description: 'Buy and sell digital gold instantly anytime',
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      {/* Floating Particles */}
      {particleAnims.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              left: `${20 + index * 15}%`,
              opacity: anim,
              transform: [
                {
                  translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, -50],
                  }),
                },
                {
                  scale: anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1, 0],
                  }),
                },
              ],
            },
          ]}
        />
      ))}

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.onboardCard,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Animated.View
              style={[
                styles.logoWrapper,
                {
                  transform: [{ rotate: logoRotate }],
                },
              ]}
            >
              <LinearGradient
                colors={['#ffd700', '#ffed4a']}
                style={styles.logo}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.logoText}>₹</Text>
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Title and Subtitle */}
          <View style={styles.titleContainer}>
            <LinearGradient
              colors={['#ffd700', '#ffed4a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleGradient}
            >
              <Text style={styles.appTitle}>DigiGold</Text>
            </LinearGradient>
            <Text style={styles.subtitle}>
              Start your digital gold investment journey with complete security and transparency
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.featureCard,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-50, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={['#ffd700', '#ffed4a']}
                  style={styles.featureIcon}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.featureIconText}>{feature.icon}</Text>
                </LinearGradient>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* CTA Buttons */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ffd700', '#ffed4a']}
                style={styles.primaryButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>GET STARTED</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleLearnMore}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>LEARN MORE</Text>
            </TouchableOpacity>
          </View>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffd700',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  onboardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 30,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoWrapper: {
    shadowColor: '#ffd700',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleGradient: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.1)',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureIconText: {
    fontSize: 18,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 20,
  },
  ctaContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    marginBottom: 15,
    shadowColor: '#ffd700',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  primaryButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
    letterSpacing: 1,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
    fontWeight: '600',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#ffd700',
    transform: [{ scale: 1.2 }],
  },
});

export default DigiGoldOnboarding;