function neverGiveUp(dream) {
    let myDream = new Dreams(dream);
    if (!myDream.happened()) {
      neverGiveUp(createNewDream('My New Dream'));
    }
  }


  