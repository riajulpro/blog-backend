import categoriesModel from "../models/categories.model";

async function findOrCreateCategories(categoriesName: string[], session: any) {
  const categoryIds = [];

  for (const name of categoriesName) {
    let category = await categoriesModel.findOne({ name }).session(session);

    if (!category) {
      category = new categoriesModel({ name });
      await category.save({ session });
    }

    categoryIds.push(category._id);
  }

  return categoryIds;
}

export default findOrCreateCategories;
