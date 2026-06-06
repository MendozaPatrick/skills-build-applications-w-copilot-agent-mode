// scripts/populateDB.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../src/models/User';
import { WorkoutSession } from '../src/models/WorkoutSession';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';

// Sample user data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    weight: 75,
    height: 180,
    goal: 'Weight Loss',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 32,
    weight: 62,
    height: 165,
    goal: 'Muscle Gain',
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    age: 35,
    weight: 85,
    height: 185,
    goal: 'Endurance',
  },
  {
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    age: 26,
    weight: 58,
    height: 168,
    goal: 'Fitness',
  },
  {
    name: 'Tom Brown',
    email: 'tom.brown@example.com',
    age: 40,
    weight: 92,
    height: 178,
    goal: 'Weight Loss',
  },
];

// Sample workout data
const createSampleWorkouts = (userIds: mongoose.Types.ObjectId[]) => {
  const exercises = [
    { name: 'Running', duration: 30, calories: 300 },
    { name: 'Weight Training', duration: 45, calories: 400 },
    { name: 'Cycling', duration: 60, calories: 500 },
    { name: 'Swimming', duration: 40, calories: 380 },
    { name: 'Yoga', duration: 50, calories: 150 },
    { name: 'HIIT', duration: 25, calories: 350 },
    { name: 'Walking', duration: 45, calories: 200 },
    { name: 'Pilates', duration: 50, calories: 250 },
  ];

  const workouts: any[] = [];

  // Create 3-4 workouts per user with varied dates
  userIds.forEach((userId, userIndex) => {
    const workoutsPerUser = userIndex % 2 === 0 ? 4 : 3;
    for (let i = 0; i < workoutsPerUser; i++) {
      const exercise = exercises[Math.floor(Math.random() * exercises.length)];
      const daysAgo = Math.floor(Math.random() * 30);
      const workoutDate = new Date();
      workoutDate.setDate(workoutDate.getDate() - daysAgo);

      workouts.push({
        userId,
        exerciseName: exercise.name,
        duration: exercise.duration,
        caloriesBurned: exercise.calories,
        date: workoutDate,
      });
    }
  });

  return workouts;
};

async function populateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await WorkoutSession.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert users
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Create user IDs array
    const userIds = insertedUsers.map((user) => user._id);

    // Generate and insert workout sessions
    const sampleWorkouts = createSampleWorkouts(userIds);
    await WorkoutSession.insertMany(sampleWorkouts);
    console.log(`✅ Inserted ${sampleWorkouts.length} workout sessions`);

    // Display summary
    console.log('\n📊 Database Population Summary:');
    console.log(`   Users: ${insertedUsers.length}`);
    console.log(`   Workouts: ${sampleWorkouts.length}`);
    console.log('\n📋 Sample Users:');
    insertedUsers.forEach((user) => {
      console.log(
        `   - ${user.name} (${user.email}) - Goal: ${user.goal}`
      );
    });

    console.log('\n✨ Database population complete!');
  } catch (error) {
    console.error('❌ Error populating database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  }
}

// Run the population script
populateDatabase();
