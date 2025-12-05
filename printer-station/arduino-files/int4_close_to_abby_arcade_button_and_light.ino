const int buttonPin = 14;       
const int lightPin = 9;
int lastButtonState = LOW;

bool blinking = false;
unsigned long blinkStartTime = 0;
unsigned long lastBlinkTime = 0;
bool lightState = false;

void setup() {
  pinMode(buttonPin, INPUT); // (Internal pull-up resistor on input pin if needed)
  pinMode(lightPin, OUTPUT);
  //relay added code
  digitalWrite(lightPin, LOW);  // Make sure relay starts OFF
  Serial.begin(9600);  // Added this line
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH && lastButtonState == LOW && !blinking) {
    // Send signal once when button is pressed
    Serial.println("pressed");
    // start blinking timer by capturing in milliseconds
    blinking = true;
    blinkStartTime = millis();
    lastBlinkTime = millis();
  }

  // Blinking logic
    if (blinking) {
      // Stop after 10 seconds
      if (millis() - blinkStartTime >= 10000) {
        blinking = false;
        digitalWrite(lightPin, LOW);
      }

    // Blink every 500ms which give one blink per sec
    if (millis() - lastBlinkTime >= 500) {
      relayState = !relayState;
      // relay added code
      digitalWrite(lightPin, relayState ? HIGH : LOW);  // Toggle relay
      Serial.print("Relay is ");
      Serial.println(relayState ? "ON" : "OFF");
      lastBlinkTime = millis();
      //
      // digitalWrite(lightPin, lightState);
      // lastBlinkTime = millis();
    }
  }

  lastButtonState = buttonState;
}

