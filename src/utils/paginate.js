import _ from "lodash";

export function paginate(items, pageNumber, itemsPerPage) {
    // current Users on the Page - start and end indexes of array
    // const indexOfLastUser = pageNumber * itemsPerPage - 1;
    const indexOfFirstUser = pageNumber * itemsPerPage - itemsPerPage;

    // создаем новый массив users обрезанный по start-end индексам
    //   const usersCrop = items.filter((user, index) => {
    //     if (index >= indexOfFirstUser && index <= indexOfLastUser) {
    //       return user;
    //     }
    //   });

    // lodash решение
    const usersCrop = _(items)
        .slice(indexOfFirstUser)
        .take(itemsPerPage)
        .value();

    return usersCrop;
}
