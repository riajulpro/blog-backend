import tagsModel from "../models/tags.model";

async function findOrCreateTags(tagNames: string[], session: any) {
  const tagIds = [];

  for (const name of tagNames) {
    let tag = await tagsModel.findOne({ name }).session(session);

    if (!tag) {
      tag = new tagsModel({ name });
      await tag.save({ session });
    }

    tagIds.push(tag._id);
  }

  return tagIds;
}

export default findOrCreateTags;
