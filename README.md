# 🇪🇬 Egypt Empire 2025 - Modern Strategy Game

A comprehensive 2D strategy game where you lead Egypt through challenges, diplomacy, wars, and development. Manage 27 governorates, maintain citizen happiness, engage in international relations, and build a prosperous nation!

## 🎮 Game Features

### Core Systems
- **Interactive 2D Map**: 27 Egyptian governorates with unique resources and characteristics
- **Citizen Happiness**: 6 key indicators (Health, Education, Security, Economy, Infrastructure, Employment)
- **Time Progression**: Real-time game loop with adjustable speeds (pause, 1x, 2x, 5x)
- **Dynamic Economy**: GDP tracking, resource production, trade, and market prices

### Diplomacy & International Relations
- **Neighboring Countries**: Libya, Sudan, Palestine, Jordan, Saudi Arabia
- **Diplomatic Actions**: Economic aid, joint exercises, sanctions, cultural exchange
- **Treaties**: Trade agreements, military alliances, non-aggression pacts, strategic cooperation
- **Relations System**: -100 (hostile) to +100 (allied)

### Military & Wars
- **War Declaration**: Choose tactics (Offensive, Defensive, Guerrilla, Naval Blockade)
- **Battle System**: Military strength calculations based on army size, technology, budget
- **Peace Negotiations**: End conflicts through diplomacy
- **Military Alliances**: Strengthen defense through partnerships

### Resources & Trade
- **17 Resource Types**: Oil, gas, cotton, wheat, tourism, Suez Canal revenues, and more
- **Production System**: Each governorate produces specific resources
- **Import/Export**: Trade with neighboring countries
- **Dynamic Pricing**: Market prices adjust based on supply and demand
- **Suez Canal**: Major revenue source from international shipping

### Politics & Governance
- **Happiness Management**: Balance multiple indicators to keep citizens content
- **Random Events**: Economic crises, natural disasters, opportunities, political challenges
- **Decision Making**: Every choice affects multiple aspects of governance

### International Organizations
- **Arab League**: Trade bonuses and political support
- **African Union**: Infrastructure projects and development aid
- **United Nations**: International recognition and humanitarian assistance

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/obieda-hussien/egypt-empire-2025.git

# Navigate to project directory
cd egypt-empire-2025

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎯 How to Play

### Getting Started
1. Game starts on January 1, 2025
2. You begin with:
   - Treasury: 1 Trillion EGP
   - GDP: $400 Billion
   - Happiness: 65%
   - Popularity: 65%
   - Army: 450,000 soldiers

### Core Gameplay Loop
1. **Monitor Indicators**: Watch happiness, economy, and military strength
2. **Make Decisions**: Respond to events and implement policies
3. **Manage Resources**: Balance production, imports, and exports
4. **Diplomacy**: Build relationships with neighboring countries
5. **Time Management**: Control game speed to handle crises effectively

### Tips for Success
- **Balance is Key**: Don't neglect any happiness indicator
- **Economic Stability**: Maintain positive GDP growth and control inflation
- **Strategic Alliances**: Build strong relations before conflicts arise
- **Resource Planning**: Ensure adequate resource production for exports
- **Event Responses**: Choose event options that align with long-term goals

## 🏆 Victory Conditions

Achieve any of these to win:
- Maintain power for 20 years
- Achieve 90+ happiness for 5 consecutive years
- Become regional superpower (GDP > all neighbors combined)
- Win 5 consecutive elections
- Join UN Security Council as permanent member

## ⚠️ Defeat Conditions

Avoid these scenarios:
- Lose two consecutive elections
- Happiness below 20% for 2+ years (revolution)
- Treasury bankrupt for 6+ months
- Complete military defeat and occupation
- Military coup (low army morale + unpopularity)

## 🛠️ Technical Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
egypt-empire-2025/
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard/     # Economic and social charts
│   │   ├── Diplomacy/     # International relations
│   │   ├── Events/        # Random events system
│   │   ├── Map/           # Egypt map visualization
│   │   ├── Organizations/ # International organizations
│   │   ├── Politics/      # Happiness and governance
│   │   ├── Resources/     # Resource management
│   │   └── UI/            # Reusable UI components
│   ├── data/              # Game data (governorates, countries, resources)
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Game logic and calculations
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🎨 Design Philosophy

- **Modern & Clean**: Professional UI with strategic color scheme
- **Navy Blue (#1e3a8a)**: Authority and stability
- **Gold (#fbbf24)**: Wealth and Egyptian theme
- **Slate Gray (#475569)**: Modern and professional
- **Intuitive Navigation**: Easy access to all game systems
- **Real-time Feedback**: Immediate response to player actions

## 🌍 Governorates (27 محافظات)

The game includes all 27 Egyptian governorates with accurate:
- Population data
- Primary resources (agriculture, industry, tourism, etc.)
- Infrastructure levels
- Geographic positioning

Major governorates include:
- Cairo (القاهرة) - Capital, finance center
- Alexandria (الإسكندرية) - Tourism, gas, industry
- Giza (الجيزة) - Pyramids, tourism
- Port Said/Ismailia/Suez - Suez Canal operations
- Red Sea/South Sinai - Tourism hotspots
- And 20 more unique regions!

## 📊 Game Mechanics

### Happiness Calculation
```
Overall Happiness = 
  Health (20%) + 
  Education (18%) + 
  Security (15%) + 
  Economy (22%) + 
  Infrastructure (15%) + 
  Employment (10%)
```

### Military Strength
Based on:
- Army size (max 30 points)
- Military technology (max 35 points)
- Defense budget (max 25 points)
- Alliances (2.5 points each, max 10 points)

### Resource Production
```
Production = Base × HappinessFactor × InfraFactor × TechFactor
```

## 🔄 Future Enhancements

Potential additions:
- Save/Load game functionality
- More detailed battle simulations
- Additional random events
- Multiplayer mode
- Historical scenarios
- Achievement system
- Sound effects
- Advanced AI for elections
- More international organizations

## 🤝 Contributing

This is a demonstration project. Feedback and suggestions are welcome!

## 📝 License

MIT License - Feel free to use and modify

## 🎖️ Credits

Developed as a comprehensive strategy game showcasing:
- Complex state management
- Real-time game systems
- Interactive data visualization
- Strategic decision-making
- Egyptian culture and geography

---

**Made with ❤️ for strategy game enthusiasts**

🎮 Start your journey to build the greatest Egypt Empire! 🇪🇬