function is2xxResponse(status: number) {
  return status >= 200 && status <= 299;
}

export default {
  is2xxResponse,
};
