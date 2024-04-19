const asyncHandler = (fn) => async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      console.error('Error caught:', error);
    }
  };
  
  export default asyncHandler;
  