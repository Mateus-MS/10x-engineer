# beginner_conditionals_short.py
# Random Python practice for conditionals

import random

print("Welcome!")

# Age
age = int(input("How old are you? "))
if age < 0:
    print("Future?")
elif age < 13:
    print("Kid!")
elif age < 20:
    print("Teen!")
elif age < 65:
    print("Adult!")
else:
    print("Senior!")

# Color
color = input("Favorite color? ").lower()
if color == "red":
    print("Fire!")
elif color == "blue":
    print("Sky!")
elif color == "green":
    print("Nature!")
else:
    print("Interesting!")

# Guessing game
number = random.randint(1, 10)
guess = int(input("Guess 1-10: "))
if guess == number:
    print("Correct!")
elif guess < number:
    print("Too low!")
else:
    print("Too high!")

# Temperature
temp = float(input("Temperature (C)? "))
if temp < 0:
    print("Cold!")
elif temp < 10:
    print("Chilly.")
elif temp < 25:
    print("Nice!")
else:
    print("Hot!")

# Day
day = input("Day? ").lower()
if day in ["saturday", "sunday"]:
    print("Weekend!")
elif day == "friday":
    print("Almost weekend!")
else:
    print("Work time!")

# Score
score = int(input("Score 0-100: "))
if score >= 90:
    print("Excellent!")
    if score == 100:
        print("Perfect!")
elif score >= 70:
    print("Good!")
    if score >= 85:
        print("Very good!")
else:
    print("Practice more.")

# Rain
umbrella = input("Have umbrella? (yes/no) ").lower() == "yes"
raining = input("Is it raining? (yes/no) ").lower() == "yes"
if raining and umbrella:
    print("Safe!")
elif raining:
    print("Wet!")
else:
    print("Enjoy!")

# Random number
num = random.randint(1, 100)
print("Random number 1-100.")
if num % 2 == 0:
    if num % 3 == 0:
        print(f"{num} divisible by 2 & 3!")
    else:
        print(f"{num} divisible by 2 only.")
elif num % 3 == 0:
    print(f"{num} divisible by 3 only.")
else:
    print(f"{num} divisible by neither.")

# Food
food = input("Food (pizza/burger/salad)? ").lower()
drink = input("Drink (water/soda/juice)? ").lower()
if food == "pizza" and drink == "soda":
    print("Classic!")
elif food == "salad" and drink == "juice":
    print("Healthy!")
else:
    print("Nice combo!")

# Mood
mood = input("Mood (happy/sad/angry/other)? ").lower()
if mood == "happy":
    print("Yay!")
elif mood == "sad":
    print("Cheer up!")
elif mood == "angry":
    print("Calm down!")
else:
    print("Hmm...")

print("Done!")