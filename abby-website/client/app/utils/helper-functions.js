// Function to capitalize the first letter of a string.
// used in open-page and open page registered
export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validateCloseUpForm({ room, message, file }) {
  const errors = {
    message: null,
    room: null,
    image: null,
  };

  if (!message?.trim()) {
    errors.message = "Message is required.";
  }
  if (!room || isNaN(room)) {
    errors.room = "Please select a room.";
  }
  if (!file) {
    errors.image = "Image is required.";
  } else if (file.size === 0 || !file.type.startsWith("image/")) {
    errors.image = "Invalid image file.";
  } else if (file.size > 50 * 1024 * 1024) {
    errors.image = "File too large. Max is 50MB.";
  } else if (!['image/jpeg', 'image/png'].includes(file.type)) {
    errors.image = "Only JPG or PNG images are supported.";
  }

  return errors;
}

// Function to get a random selection of items from a list of items.
// Needs to be at least as long as the count.
// Needs to be an array or iterable.
// used to build up select your profile sign up pop up
export const getRandomSelection = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// making a visual avatar grid
export function chunkProfileLayout(profiles) {
  const len = profiles.length;

  if (len <= 3) {
    return [profiles]; // one row
  } else if (len === 4) {
    return [
      profiles.slice(0, 2), // top
      profiles.slice(2),    // bottom
    ];
  } else if (len === 5) {
    return [
      profiles.slice(0, 2), // top
      [profiles[2]],        // middle
      profiles.slice(3),    // bottom
    ];
  } else if (len === 6) {
    return [
      profiles.slice(0, 3),
      profiles.slice(3),
    ];
  } else if (len === 7) {
    return [
      profiles.slice(0, 3),
      [profiles[3]],
      profiles.slice(4),
    ];
  } else if (len === 8) {
    return [
      profiles.slice(0, 4),
      profiles.slice(4),
    ];
  } else if (len === 9) {
    return [
      profiles.slice(0, 3),
      profiles.slice(3, 6),
      profiles.slice(6),
    ];
  } else {
    return [
      profiles.slice(0, 4),
      profiles.slice(4, 7),
      profiles.slice(7, 10),
    ]; // Max 10
  }
}

