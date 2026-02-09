# --- BASIC DATA TYPES ---
name = "Alex"           # String
age = 25                # Integer
score = 88.5            # Float
is_active = True        # Boolean

# --- STRING OPERATIONS ---
greeting = "Hello " + name
print(greeting)

# --- MATH AND UPDATES ---
age = age + 1           # Incrementing
health = 100
damage = 20
current_health = health - damage

# --- LISTS (GROUPING VARIABLES) ---
inventory = ["sword", "shield", "map"]
item_count = len(inventory)

# --- FORMATTING OUTPUT ---
print(f"Status: {name}")
print(f"Level: {age}")
print(f"Health: {current_health}")
print(f"Items: {item_count}")

# --- TYPE DYNAMICS ---
# Variables can be redefined with different types
data = 10
print(data)

data = "Now I am a string"
print(data)

# --- CONSTANTS ---
# Use uppercase for values that shouldn't change
PI = 3.14159
MAX_CONNECTIONS = 5

# --- CALCULATIONS ---
radius = 5
area = PI * (radius ** 2)
print(f"Circle Area: {area}")

# --- LOGIC CHECK ---
can_enter = is_active and (age > 18)
print(f"Access granted: {can_enter}")

# --- NULL VALUES ---
# Use None to represent 'nothing'
player_target = None