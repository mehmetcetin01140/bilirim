export const GetCategoryFromId = ( id : number) : string | undefined => {
  switch (id) {
    case 0:
      return "Bilim";
    case 1:
      return "Tarih";
    case 2:
      return "Spor";
    case 3:
      return "Karışık";

    default:
      break;
  }
};
