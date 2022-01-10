const dbstore = require("../../dbstore/mongo");

const createGig = async (data) => {
  const { result, hasError } = await dbstore.createGig(data);

  if (hasError || result == null) {
    return { status: "ERROR_FOUND" };
  }

  return { result, status: "GIG_CREATED" };
};

const findGig = async (data) => {
  const { result, hasError } = await dbstore.findGig(data);

  if (hasError) {
    return { status: "ERROR_FOUND" };
  }
  if (!result) {
    return { status: "NOT_FOUND" };
  }

  return { result, status: "GIG_FOUND" };
};

const findAllGig = async (data) => {
  const { result, hasError } = await dbstore.findAllGig(data);

  if (hasError) {
    return { status: "ERROR_FOUND" };
  }
  if (result.length === 0) {
    return { status: "NOT_FOUND" };
  }
  return { result, status: "GIGS_FOUND" };
};

const updateGig = async (filter, data) => {
  const { result, hasError } = await dbstore.updateGig(filter, data);

  if (hasError) {
    return { status: "ERROR_FOUND" };
  }
  if (!result) {
    return { status: "NOT_FOUND" };
  }

  return { result, status: "GIG_UPDATED" };
};

const deleteGig = async (data) => {
  const { result, hasError } = await dbstore.deleteGig(data);

  if (hasError || !result) {
    return { status: "ERROR_FOUND" };
  }
  if (result.deletedCount === 0) {
    return { status: "NOT_DELETED" };
  }

  return { status: "DELETED" };
};

module.exports = { createGig, findGig, findAllGig, updateGig, deleteGig };
