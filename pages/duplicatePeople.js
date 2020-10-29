import usePeople from '../hooks/usePeople';

const checkPossibleDuplicatePeople = (people) => {
    //For each person's email
    //compare with other email
    //if similarity is 85% close but lower than 100% then mark as a possible duplicate
    const duplicates = [];

    people && people.forEach((person1) => {
        people.forEach((person2) => {
            const compare = similarity(person1.email_address, person2.email_address);
            if(compare >= .85 && compare < 1){
                duplicates.push([person1.email_address, person2.email_address]);
            }
        });
    })

    return duplicates;
    
}

const similarity = (s1, s2) => {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

//Levenshtein distance
const editDistance = (s1, s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function Page() {
    const { people, isLoading, isError } = usePeople();
    const possibleDuplicatePeople = checkPossibleDuplicatePeople(people);

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>These are possible duplicate emails:</h4>
        {
            possibleDuplicatePeople && 
                possibleDuplicatePeople.map(
                    (duplicates) =>  
                        <div>
                            {
                                duplicates.map(
                                    (email) => 
                                        <span style={{ paddingRight: '30px' }}>
                                            {email}
                                        </span>
                                )
                            }
                        </div>
                )
        }
    </div>
}
  
export default Page