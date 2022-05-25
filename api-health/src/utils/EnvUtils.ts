export const valueDotEnvIsBoolean = (value: string) => {
  let valueIsBoolean = false;

  if (value) {
    valueIsBoolean = value && value.toLowerCase() === 'true';
  }

  return valueIsBoolean;
};
