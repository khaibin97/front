class SearchAndFilter {

  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    var filtered = courses
    console.log(filtered)
    let searchKeys = [];
    // console.log(filtered)
    console.log(subject)
    if(subject !== 'All'){

      searchKeys = (Object.keys(filtered).filter(key => filtered[key].subject === subject))

      for(var id in filtered){
        
        if(!searchKeys.includes(id)){
          console.log(id)
          delete filtered[id]
        }
      }
    }

      // delete filtered[searchKeys[key]]
    // console.log(untouched)
    // console.log(filtered)
    return filtered;
  }
}

export default SearchAndFilter;
