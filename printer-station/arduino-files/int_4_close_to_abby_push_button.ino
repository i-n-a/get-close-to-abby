const int buttonPin = 2;
int lastButtonState = LOW;

void setup() {
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH && lastButtonState == LOW) {
    // Send signal once when button is pressed
    Serial.println("pressed");
    delay(200);  // debounce
  }

  lastButtonState = buttonState;
}
