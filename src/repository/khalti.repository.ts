// import Khalti from "../model/khalti.model";
// import { khaltiType } from "../utils/types/khalti.type";

// class KhaltiRepository {
//   constructor() {}

//   addData = async (dataToSave: khaltiType) => {
//     const khaltiData = new Khalti(dataToSave);
//     await khaltiData.save();
//     return khaltiData;
//   };
//   getDataByToken = async (token: string) => {
//     const khaltiData = await Khalti.findOne({ token: token });
//     return khaltiData;
//   };
//   updateKhaltiData = async (id: string) => {
//     const khaltiData = await Khalti.findByIdAndUpdate(id, {
//       isPaid: true,
//     });
//     return khaltiData;
//   };
// }

// let khaltiRepository = new KhaltiRepository();
// export { khaltiRepository, KhaltiRepository };
