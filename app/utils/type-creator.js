const types = (names, prefix) =>
  names.reduce(
    (types, name) => ({
      ...types,
      [name]: prefix ? `${prefix}_${name}` : name,
    }),
    {}
  );

const async = (name) => [name, `${name}_SUCCESS`, `${name}_FAIL`];

export { types, async };
