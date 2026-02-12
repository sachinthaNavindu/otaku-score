# Otaku Score

**Rate • Review • Discover Anime**

Otaku Score is a mobile app built with **React Native** and **Expo** that lets anime fans rate anime series/movies, write reviews, see community ratings, and manage their personal reviews.

Users can:
- View detailed anime information
- Submit star ratings (1–5) + written reviews
- Edit or delete their own reviews
- Browse top community reviews for each anime
- (planned) discover trending / popular anime


## Tech Stack

| Layer              | Technology / Library                                 | Purpose / Notes                              |
|--------------------|------------------------------------------------------|----------------------------------------------|
| **Framework**      | React Native + Expo                                  | Cross-platform mobile development            |
| **Language**       | TypeScript                                           | Type safety & better developer experience    |
| **Navigation**     | Expo Router                                          | File-based routing, used in the project      |
| **Backend**        | Firebase                                             | Authentication + Firestore (reviews storage) |
| **Auth**           | Firebase Authentication                              | Email, Google, anonymous…                    |
| **UI Components**  | React Native core + Expo Vector Icons                | Basic building blocks + Ionicons             |
| **State (local)**  | React hooks (`useState`, `useEffect`)                | Component-level state                        |
| **Data fetching**  | Custom service layer (`reviewService.ts`)            | Abstracts Firebase queries                   |
| **Styling**        | Inline StyleSheet + dark theme                       | Consistent dark anime-style UI               |
| **Image handling** | React Native `<Image>` with remote URIs              | Anime posters from external sources          |
| **Development**    | Expo Go                                              | Fast development & testing on real devices   |


## Features (Current)

- View anime details (title, poster, average rating)
- See your own review (if exists) with **edit** & **delete** functionality
- Read all community reviews sorted (currently latest / unfiltered)
- Real-time-ish average rating calculation (done on fetch)
- Clean dark-themed UI optimized for anime fans

## Planned / Future Features

- Anime search & discovery (Jikan API / AniList / official source?)
- Trending / top rated lists
- User profiles
- Like / helpful review reactions
- Spoiler tags in reviews
- Push notifications for replies
- Light mode toggle

## Prerequisites

- Node.js ≥ 18
- npm / yarn / pnpm
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode (for simulators) or physical device + Expo Go app

## Android app 
 `https://expo.dev/artifacts/eas/htttSXFhq6w4b18RoR1cyF.apk`
## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/sachinthaNavindu/otaku-score.git
cd otaku-score

# 2. Install dependencies
npm install

# 3. Create Firebase project & enable Authentication + Firestore
#    → Add web app to Firebase console
#    → Download firebaseConfig and place it in /config/firebase.ts (or similar)

# 4. Start development server
npx expo start
# or
npm run start

# → Press a → Android emulator
# → Press i → iOS simulator
# → Scan QR code with Expo Go app on your phone

 
