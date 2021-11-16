
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, 
          user_name: 'Tom1',
          room_name: "testroom1",
          message: "testmessage1",
          created_at: new Date('2021-06-26 14:26:16 UTC'),},
          {
          id: 2, 
          user_name: 'Tom2',
          room_name: "testroom2",
          message: "testmessage2",
          created_at: new Date('2021-06-27 14:26:16 UTC'),},
          {
          id: 3, 
          user_name: 'Tom3',
          room_name: "testroom3",
          message: "testmessage3",
          created_at: new Date('2021-06-28 14:26:16 UTC'),},
      ]);
    });
};
