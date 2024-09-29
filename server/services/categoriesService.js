let categories = {
    triceps: {
      title: 'Triceps'
    },
    calves: {
        title: 'Calves'
    }
  };
  
  const categoriesService = {
    getCategories(title) {
      return categories[title] ? [categories[title]] : [];
    }
  };
  
  export default categoriesService;