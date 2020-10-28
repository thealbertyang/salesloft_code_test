import usePeople from '../hooks/usePeople';

const mapChars = (people) => {
    //Make a map for characters
    //For each email address remove @ & split string and go through each character and add them to map
    const charMap = new Map();

    people && people.forEach((person) => {
        let email = person.email_address.toLowerCase().replace(/[^a-z0-9]/g, "").split("");
        email.forEach((letter) => {
            charMap.set(letter, charMap.has(letter) ? charMap.get(letter) + 1 : 1);
        })
    });

    return charMap;
}

const sortCharsByCount = (charMap) => {
    //Sort map by freq count high to low
    return Array.from(charMap)
        .sort((a, b) => a[1] > b[1] ? -1 : 1 )
        .reduce((obj, [key, value]) => (
            [
                ...obj,
                {
                    letter: key, 
                    count: value
                }
            ]
        ), [])
}

function Page() {
    const { people, isLoading, isError } = usePeople();
    const freqUniqueCharMap = sortCharsByCount(mapChars(people));

    return <table>
        {freqUniqueCharMap.map((char) => {
            return <tr>
                <td>
                    {char.letter}
                </td>
                <td>
                    {char.count}
                </td>
            </tr>
        })}
    </table>
}
  
export default Page