const int trigPin = 6;
const int echoPin = 5;
long duration;
int distance;
int lastTriggerTime = 0;
int triggerCooldown = 2000; // in milliseconds

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // Send ultrasonic pulse
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Measure the echo
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  // Trigger condition
  if (distance > 0 && distance < 10) {
    int currentTime = millis();
    if (currentTime - lastTriggerTime > triggerCooldown) {
      Serial.println("pressed");
      lastTriggerTime = currentTime;
    }
  }

  delay(100);
}
