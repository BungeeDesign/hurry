let apps = ['Uber', 'Arrow'];

let isVendorSelected = true;

const handleSelect = async (vendor) => {
  apps.push(vendor);
  if (isVendorSelected) {
    // Remove app if the user unselects
    apps = apps.filter(e => e !== vendor);
  }

  return apps.toString();
};

it('filters out the given vendor', async () => {
  expect(await handleSelect('Uber')).toBe('Arrow');
});
