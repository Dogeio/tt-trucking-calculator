import {
    DeepOmit,
    Location,
    Recipe,
    RecipeType,
    Storage,
    StorageId,
    StoragePriority,
    StorageType,
    VehicleType
} from './types.js';

export const OPEN_TRUNK = 'rm_trunk';
export const OPEN_CAB = 'rm_cabtrunk';

export const INVENTORY_FULL = '~r~Inventory full.';
export const ITEMS_EXCEED_INVENTORY_WEIGHT = '~r~Item(s) weighs more than your total inventory size.';
export const NOT_ENOUGH_ITEMS = 'Not enough items';

export const OPEN_STORAGE = 'Open Storage';

export const TAKE = 'Take';
export const TAKE_TO_TRUNK = 'Take to Trunk';

export const PUT_ALL = 'Put All';
export const DUMP_FROM_TRUNK = 'Dump from Trunk';

export const ID_REPLACERS = [/(<.+?>)|(&#.+?;)/g];

export const DEFAULT_STORAGE_PRIORITY = 0;

export const ITEMS = {
    'scrap_acid': {
        name: 'Acid',
        vrpName: 'Truck Cargo: Acid',
        weight: 5,
        isTruckingItem: true
    },
    'crafted_batteries': {
        name: 'Batteries',
        vrpName: 'Truck Cargo: Batteries',
        weight: 30,
        isTruckingItem: true
    },
    'mechanicals_battery': {
        name: 'Car Battery',
        vrpName: 'Automotive: Car Battery',
        weight: 20,
        isTruckingItem: true
    },
    'crafted_cardboard': {
        name: 'Cardboard',
        vrpName: 'Truck Cargo: Cardboard',
        weight: 10,
        isTruckingItem: true
    },
    'crafted_cement': {
        name: 'Cement Mix',
        vrpName: 'Truck Cargo: Cement Mix',
        weight: 25,
        isTruckingItem: true
    },
    'crafted_ceramictiles': {
        name: 'Ceramic Tiles',
        vrpName: 'Truck Cargo: Ceramic Tiles',
        weight: 10,
        isTruckingItem: true
    },
    'mechanicals_chassis': {
        name: 'Chassis',
        vrpName: 'Automotive: Chassis',
        weight: 80,
        isTruckingItem: true
    },
    'military_chemicals': {
        name: 'Chemicals',
        vrpName: 'Military: Chemicals',
        weight: 25,
        isTruckingItem: true
    },
    'crafted_circuit': {
        name: 'Circuit Boards',
        vrpName: 'Truck Cargo: Circuit Boards',
        weight: 20,
        isTruckingItem: true
    },
    'crafted_computer': {
        name: 'Computers',
        vrpName: 'Truck Cargo: Computers',
        weight: 35,
        isTruckingItem: true
    },
    'crafted_concrete': {
        name: 'Concrete',
        vrpName: 'Truck Cargo: Concrete',
        weight: 160,
        isTruckingItem: true
    },
    'mining_copper': {
        name: 'Copper Ore',
        vrpName: 'Copper Ore',
        weight: 1,
        isTruckingItem: true
    },
    'mining_token_copper': {
        name: 'Copper Ore Voucher',
        vrpName: 'Copper Ore Voucher',
        weight: 0,
        isTruckingItem: true
    },
    'crafted_copperwire': {
        name: 'Copper Wire Spool',
        vrpName: 'Truck Cargo: Copper Wire Spool',
        weight: 20,
        isTruckingItem: true
    },
    'petrochem_oil': {
        name: 'Crude Oil',
        vrpName: 'Petrochem: Crude Oil',
        weight: 150,
        isTruckingItem: true
    },
    'petrochem_diesel': {
        name: 'Diesel',
        vrpName: 'Petrochem: Diesel',
        weight: 25,
        isTruckingItem: true
    },
    'tcargosmall': {
        name: 'Erasers',
        vrpName: 'Truck Cargo: Erasers',
        weight: 3,
        isTruckingItem: true
    },
    'military_explosives': {
        name: 'Explosives',
        vrpName: 'Military: Explosives',
        weight: 250,
        isTruckingItem: true
    },
    'crafted_fiberglass': {
        name: 'Fiberglass Spool',
        vrpName: 'Truck Cargo: Fiberglass Spool',
        weight: 20,
        isTruckingItem: true
    },
    'refined_flint': {
        name: 'Flint',
        vrpName: 'Truck Cargo: Flint',
        weight: 5,
        isTruckingItem: true
    },
    'refined_glass': {
        name: 'Glass',
        vrpName: 'Truck Cargo: Glass',
        weight: 5,
        isTruckingItem: true
    },
    'scrap_gravel': {
        name: 'Gravel',
        vrpName: 'Truck Cargo: Gravel',
        weight: 5,
        isTruckingItem: true
    },
    'mining_iron': {
        name: 'Iron Ore',
        vrpName: 'Iron Ore',
        weight: 1,
        isTruckingItem: true
    },
    'mining_token_iron': {
        name: 'Iron Ore Voucher',
        vrpName: 'Iron Ore Voucher',
        weight: 0,
        isTruckingItem: true
    },
    'mechanicals_jumper_cable': {
        name: 'Jumper Cable',
        vrpName: 'Automotive: Jumper Cable',
        weight: 5,
        isTruckingItem: true
    },
    'petrochem_kerosene': {
        name: 'Kerosene',
        vrpName: 'Petrochem: Kerosene',
        weight: 25,
        isTruckingItem: true
    },
    'tcargologs': {
        name: 'Logs',
        vrpName: 'Truck Cargo: Logs',
        weight: 60,
        isTruckingItem: true
    },
    'petrochem_petrol': {
        name: 'Petrol',
        vrpName: 'Petrochem: Petrol',
        weight: 25,
        isTruckingItem: true
    },
    'refined_planks': {
        name: 'Planks',
        vrpName: 'Truck Cargo: Planks',
        weight: 15,
        isTruckingItem: true
    },
    'petrochem_propane': {
        name: 'Propane',
        vrpName: 'Petrochem: Propane',
        weight: 25,
        isTruckingItem: true
    },
    'recycled_rubble': {
        name: 'Quarry Rubble',
        vrpName: 'Truck Cargo: Quarry Rubble',
        weight: 150,
        isTruckingItem: true
    },
    'scrap_emerald': {
        name: 'Raw Emeralds',
        vrpName: 'Truck Cargo: Raw Emeralds',
        weight: 10,
        isTruckingItem: true
    },
    'petrochem_gas': {
        name: 'Raw Gas',
        vrpName: 'Petrochem: Raw Gas',
        weight: 150,
        isTruckingItem: true
    },
    'scrap_ore': {
        name: 'Raw Ore Mix',
        vrpName: 'Truck Cargo: Raw Ore Mix',
        weight: 15,
        isTruckingItem: true
    },
    'crafted_rebar': {
        name: 'Rebar',
        vrpName: 'Truck Cargo: Rebar',
        weight: 45,
        isTruckingItem: true
    },
    'recycled_electronics': {
        name: 'Recycled Electronics',
        vrpName: 'Truck Cargo: Recycled Electronics',
        weight: 130,
        isTruckingItem: true
    },
    'recycled_trash': {
        name: 'Recycled Trash',
        vrpName: 'Truck Cargo: Recycled Trash',
        weight: 90,
        isTruckingItem: true
    },
    'refined_aluminum': {
        name: 'Refined Aluminum',
        vrpName: 'Truck Cargo: Refined Aluminum',
        weight: 10,
        isTruckingItem: true
    },
    'refined_amalgam': {
        name: 'Refined Amalgam',
        vrpName: 'Truck Cargo: Refined Amalgam',
        weight: 15,
        isTruckingItem: true
    },
    'refined_bronze': {
        name: 'Refined Bronze Alloy',
        vrpName: 'Truck Cargo: Refined Bronze Alloy',
        weight: 10,
        isTruckingItem: true
    },
    'refined_copper': {
        name: 'Refined Copper',
        vrpName: 'Truck Cargo: Refined Copper',
        weight: 10,
        isTruckingItem: true
    },
    'refined_gold': {
        name: 'Refined Gold',
        vrpName: 'Truck Cargo: Refined Gold',
        weight: 20,
        isTruckingItem: true
    },
    'refined_solder': {
        name: 'Refined Solder',
        vrpName: 'Truck Cargo: Refined Solder',
        weight: 5,
        isTruckingItem: true
    },
    'refined_tin': {
        name: 'Refined Tin',
        vrpName: 'Truck Cargo: Refined Tin',
        weight: 10,
        isTruckingItem: true
    },
    'refined_zinc': {
        name: 'Refined Zinc',
        vrpName: 'Truck Cargo: Refined Zinc',
        weight: 10,
        isTruckingItem: true
    },
    'mechanicals_rubber': {
        name: 'Rubber',
        vrpName: 'Automotive: Rubber',
        weight: 8,
        isTruckingItem: true
    },
    'refined_sand': {
        name: 'Sand',
        vrpName: 'Truck Cargo: Sand',
        weight: 5,
        isTruckingItem: true
    },
    'tcargodust': {
        name: 'Sawdust',
        vrpName: 'Truck Cargo: Sawdust',
        weight: 3,
        isTruckingItem: true
    },
    'scrap_aluminum': {
        name: 'Scrap Aluminum',
        vrpName: 'Truck Cargo: Scrap Aluminum',
        weight: 5,
        isTruckingItem: true
    },
    'scrap_copper': {
        name: 'Scrap Copper',
        vrpName: 'Truck Cargo: Scrap Copper',
        weight: 5,
        isTruckingItem: true
    },
    'scrap_gold': {
        name: 'Scrap Gold',
        vrpName: 'Truck Cargo: Scrap Gold',
        weight: 10,
        isTruckingItem: true
    },
    'scrap_lead': {
        name: 'Scrap Lead',
        vrpName: 'Truck Cargo: Scrap Lead',
        weight: 15,
        isTruckingItem: true
    },
    'scrap_mercury': {
        name: 'Scrap Mercury',
        vrpName: 'Truck Cargo: Scrap Mercury',
        weight: 15,
        isTruckingItem: true
    },
    'scrap_plastic': {
        name: 'Scrap Plastic',
        vrpName: 'Truck Cargo: Scrap Plastic',
        weight: 5,
        isTruckingItem: true
    },
    'scrap_tin': {
        name: 'Scrap Tin',
        vrpName: 'Truck Cargo: Scrap Tin',
        weight: 5,
        isTruckingItem: true
    },
    'shipping_crate_empty': {
        name: 'Shipping Container',
        vrpName: 'Shipping Container',
        weight: 100,
        isTruckingItem: true
    },
    'petrochem_sulfur': {
        name: 'Sulfur',
        vrpName: 'Petrochem: Sulfur',
        weight: 5,
        isTruckingItem: true
    },
    'military_titanium': {
        name: 'Titanium',
        vrpName: 'Military: Titanium',
        weight: 20,
        isTruckingItem: true
    },
    'military_titanium_ore': {
        name: 'Titanium Ore',
        vrpName: 'Military: Titanium Ore',
        weight: 25,
        isTruckingItem: true
    },
    'pucargosmall': {
        name: 'Tools',
        vrpName: 'Truck Cargo: Tools',
        weight: 1,
        isTruckingItem: true
    },
    'recycled_waste': {
        name: 'Toxic Waste',
        vrpName: 'Truck Cargo: Toxic Waste',
        weight: 110,
        isTruckingItem: true
    },
    'mechanicals_battery_evb': {
        name: 'Traction Battery',
        vrpName: 'Automotive: Traction Battery',
        weight: 90,
        isTruckingItem: true
    },
    'liquid_water': {
        name: 'Treated Water (100L)',
        vrpName: 'Truck Cargo: Treated Water (100L)',
        weight: 100,
        isTruckingItem: true
    },
    'liquid_water_raw': {
        name: 'Unfiltered Water (100L)',
        vrpName: 'Truck Cargo: Unfiltered Water (100L)',
        weight: 100,
        isTruckingItem: true
    },
    'mechanicals_vehicle_framework': {
        name: 'Vehicle Framework',
        vrpName: 'Automotive: Vehicle Framework',
        weight: 200,
        isTruckingItem: true
    },
    'petrochem_waste': {
        name: 'Waste Water',
        vrpName: 'Petrochem: Waste Water',
        weight: 50,
        isTruckingItem: true
    },
    'mechanicals_wheels': {
        name: 'Wheels',
        vrpName: 'Automotive: Wheels',
        weight: 15,
        isTruckingItem: true
    },
    'fridge_airline_meal': {
        name: 'Airline Meal',
        vrpName: "<span style='color:green'>Airline Meal</span>",
        weight: 3,
        isTruckingItem: false
    },
    'backpack': {
        name: 'Backpack',
        vrpName: "<span style='color:purple'>Backpack</span>",
        weight: 0,
        isTruckingItem: false
    },
    'engine_bag': {
        name: 'Bag-o-Engines',
        vrpName: 'Bag-o-Engines',
        weight: 0,
        isTruckingItem: false
    },
    'bandages': {
        name: 'Bandage',
        vrpName: 'Bandage',
        weight: 0.05,
        isTruckingItem: false
    },
    'prefix_pack_1': {
        name: 'Blessing Pack [Series 1]',
        vrpName: 'Blessing Pack [Series 1]',
        weight: 0,
        isTruckingItem: false
    },
    'prefix_pack_2': {
        name: 'Blessing Pack [Series 2]',
        vrpName: 'Blessing Pack [Series 2]',
        weight: 0,
        isTruckingItem: false
    },
    'prefix_pack_3': {
        name: 'Blessing Pack [Series 3]',
        vrpName: 'Blessing Pack [Series 3]',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.comet|Comet': {
        name: 'Blessing: ☄ Comet',
        vrpName: 'Blessing: <span style="color:tomato">☄ Comet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.umbrella_with_rain_drops|Umbrella With Rain Drops': {
        name: 'Blessing: ☔ Umbrella With Rain Drops',
        vrpName: 'Blessing: <span style="color:tomato">☔ Umbrella With Rain Drops</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.anchor|Anchor': {
        name: 'Blessing: ⚓ Anchor',
        vrpName: 'Blessing: <span style="color:tomato">⚓ Anchor</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.medical_symbol|Medical Symbol': {
        name: 'Blessing: ⚕️ Medical Symbol',
        vrpName: 'Blessing: <span style="color:tomato">⚕️ Medical Symbol</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.scale|Scale': {
        name: 'Blessing: ⚖ Scale',
        vrpName: 'Blessing: <span style="color:tomato">⚖ Scale</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.snowman_without_snow|Snowman Without Snow': {
        name: 'Blessing: ⛄ Snowman Without Snow',
        vrpName: 'Blessing: <span style="color:tomato">⛄ Snowman Without Snow</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.scissors|Scissors': {
        name: 'Blessing: ✂ Scissors',
        vrpName: 'Blessing: <span style="color:tomato">✂ Scissors</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.snowflake|Snowflake': {
        name: 'Blessing: ❄ Snowflake',
        vrpName: 'Blessing: <span style="color:tomato">❄ Snowflake</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.star|Star': {
        name: 'Blessing: ⭐ Star',
        vrpName: 'Blessing: <span style="color:tomato">⭐ Star</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.globe_with_meridians|Globe with Meridians': {
        name: 'Blessing: 🌐 Globe with Meridians',
        vrpName: 'Blessing: <span style="color:tomato">🌐 Globe with Meridians</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.new_moon|New Moon': {
        name: 'Blessing: 🌑 New Moon',
        vrpName: 'Blessing: <span style="color:tomato">🌑 New Moon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.last_quarter_moon|Last Quarter Moon': {
        name: 'Blessing: 🌗 Last Quarter Moon',
        vrpName: 'Blessing: <span style="color:tomato">🌗 Last Quarter Moon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.tornado|Tornado': {
        name: 'Blessing: 🌪 Tornado',
        vrpName: 'Blessing: <span style="color:tomato">🌪 Tornado</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.seedling|Seedling': {
        name: 'Blessing: 🌱 Seedling',
        vrpName: 'Blessing: <span style="color:tomato">🌱 Seedling</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.deciduous_tree|Deciduous Tree': {
        name: 'Blessing: 🌳 Deciduous Tree',
        vrpName: 'Blessing: <span style="color:tomato">🌳 Deciduous Tree</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.cherry_blossom|Cherry Blossom': {
        name: 'Blessing: 🌸 Cherry Blossom',
        vrpName: 'Blessing: <span style="color:tomato">🌸 Cherry Blossom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.blossom|Blossom': {
        name: 'Blessing: 🌼 Blossom',
        vrpName: 'Blessing: <span style="color:tomato">🌼 Blossom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.sheaf_of_rice|Sheaf of Rice': {
        name: 'Blessing: 🌾 Sheaf of Rice',
        vrpName: 'Blessing: <span style="color:tomato">🌾 Sheaf of Rice</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.four_leaf_clover|Four Leaf Clover': {
        name: 'Blessing: 🍀 Four Leaf Clover',
        vrpName: 'Blessing: <span style="color:tomato">🍀 Four Leaf Clover</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.grape|Grape': {
        name: 'Blessing: 🍇 Grape',
        vrpName: 'Blessing: <span style="color:tomato">🍇 Grape</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.banana|Banana': {
        name: 'Blessing: 🍌 Banana',
        vrpName: 'Blessing: <span style="color:tomato">🍌 Banana</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.cherry|Cherry': {
        name: 'Blessing: 🍒 Cherry',
        vrpName: 'Blessing: <span style="color:tomato">🍒 Cherry</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.strawberry|Strawberry': {
        name: 'Blessing: 🍓 Strawberry',
        vrpName: 'Blessing: <span style="color:tomato">🍓 Strawberry</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.donut|Donut': {
        name: 'Blessing: 🍩 Donut',
        vrpName: 'Blessing: <span style="color:tomato">🍩 Donut</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.8_ball|8 Ball': {
        name: 'Blessing: 🎱 8 Ball',
        vrpName: 'Blessing: <span style="color:tomato">🎱 8 Ball</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.saxophone|Saxophone': {
        name: 'Blessing: 🎷 Saxophone',
        vrpName: 'Blessing: <span style="color:tomato">🎷 Saxophone</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.trumpet|Trumpet': {
        name: 'Blessing: 🎺 Trumpet',
        vrpName: 'Blessing: <span style="color:tomato">🎺 Trumpet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.hospital|Hospital': {
        name: 'Blessing: 🏥 Hospital',
        vrpName: 'Blessing: <span style="color:tomato">🏥 Hospital</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.rosette|Rosette': {
        name: 'Blessing: 🏵 Rosette',
        vrpName: 'Blessing: <span style="color:tomato">🏵 Rosette</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.rabbit|Rabbit': {
        name: 'Blessing: 🐇 Rabbit',
        vrpName: 'Blessing: <span style="color:tomato">🐇 Rabbit</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.whale|Whale': {
        name: 'Blessing: 🐋 Whale',
        vrpName: 'Blessing: <span style="color:tomato">🐋 Whale</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.horse|Horse': {
        name: 'Blessing: 🐎 Horse',
        vrpName: 'Blessing: <span style="color:tomato">🐎 Horse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.boar|Boar': {
        name: 'Blessing: 🐗 Boar',
        vrpName: 'Blessing: <span style="color:tomato">🐗 Boar</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.elephant|Elephant': {
        name: 'Blessing: 🐘 Elephant',
        vrpName: 'Blessing: <span style="color:tomato">🐘 Elephant</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.honeybee|Honeybee': {
        name: 'Blessing: 🐝 Honeybee',
        vrpName: 'Blessing: <span style="color:tomato">🐝 Honeybee</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.hatching_chick|Hatching Chick': {
        name: 'Blessing: 🐣 Hatching Chick',
        vrpName: 'Blessing: <span style="color:tomato">🐣 Hatching Chick</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.squirrel|Squirrel': {
        name: 'Blessing: 🐿 Squirrel',
        vrpName: 'Blessing: <span style="color:tomato">🐿 Squirrel</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.clapping_hands|Clapping Hands': {
        name: 'Blessing: 👏 Clapping Hands',
        vrpName: 'Blessing: <span style="color:tomato">👏 Clapping Hands</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.crown|Crown': {
        name: 'Blessing: 👑 Crown',
        vrpName: 'Blessing: <span style="color:tomato">👑 Crown</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.droplet|Droplet': {
        name: 'Blessing: 💧 Droplet',
        vrpName: 'Blessing: <span style="color:tomato">💧 Droplet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.megaphone|Megaphone': {
        name: 'Blessing: 📣 Megaphone',
        vrpName: 'Blessing: <span style="color:tomato">📣 Megaphone</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.clairvoyant|Clairvoyant': {
        name: 'Blessing: 🔮 Clairvoyant',
        vrpName: 'Blessing: <span style="color:tomato">🔮 Clairvoyant</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.mount_fuji|Mount Fuji': {
        name: 'Blessing: 🗻 Mount Fuji',
        vrpName: 'Blessing: <span style="color:tomato">🗻 Mount Fuji</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.dizzy_face|Dizzy Face': {
        name: 'Blessing: 😵 Dizzy Face',
        vrpName: 'Blessing: <span style="color:tomato">😵 Dizzy Face</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.helicopter|Helicopter': {
        name: 'Blessing: 🚁 Helicopter',
        vrpName: 'Blessing: <span style="color:tomato">🚁 Helicopter</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.construction|Construction': {
        name: 'Blessing: 🚧 Construction',
        vrpName: 'Blessing: <span style="color:tomato">🚧 Construction</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.small_airplane|Small Airplane': {
        name: 'Blessing: 🛩 Small Airplane',
        vrpName: 'Blessing: <span style="color:tomato">🛩 Small Airplane</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.zany_face|Zany Face': {
        name: 'Blessing: 🤪 Zany Face',
        vrpName: 'Blessing: <span style="color:tomato">🤪 Zany Face</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.mind_blown|Mind Blown': {
        name: 'Blessing: 🤯 Mind Blown',
        vrpName: 'Blessing: <span style="color:tomato">🤯 Mind Blown</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.palms_up_together|Palms Up Together': {
        name: 'Blessing: 🤲 Palms Up Together',
        vrpName: 'Blessing: <span style="color:tomato">🤲 Palms Up Together</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.kiwi|Kiwi': {
        name: 'Blessing: 🥝 Kiwi',
        vrpName: 'Blessing: <span style="color:tomato">🥝 Kiwi</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.broccoli|Broccoli': {
        name: 'Blessing: 🥦 Broccoli',
        vrpName: 'Blessing: <span style="color:tomato">🥦 Broccoli</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.pretzel|Pretzel': {
        name: 'Blessing: 🥨 Pretzel',
        vrpName: 'Blessing: <span style="color:tomato">🥨 Pretzel</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.shrimp|Shrimp': {
        name: 'Blessing: 🦐 Shrimp',
        vrpName: 'Blessing: <span style="color:tomato">🦐 Shrimp</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.sauropod|Sauropod': {
        name: 'Blessing: 🦕 Sauropod',
        vrpName: 'Blessing: <span style="color:tomato">🦕 Sauropod</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp1.raccoon|Raccoon': {
        name: 'Blessing: 🦝 Raccoon',
        vrpName: 'Blessing: <span style="color:tomato">🦝 Raccoon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.microbe|Microbe': {
        name: 'Blessing: 🦠 Microbe',
        vrpName: 'Blessing: <span style="color:tomato">🦠 Microbe</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.swan|Swan': {
        name: 'Blessing: 🦢 Swan',
        vrpName: 'Blessing: <span style="color:tomato">🦢 Swan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.sloth|Sloth': {
        name: 'Blessing: 🦥 Sloth',
        vrpName: 'Blessing: <span style="color:tomato">🦥 Sloth</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.skunk|Skunk': {
        name: 'Blessing: 🦨 Skunk',
        vrpName: 'Blessing: <span style="color:tomato">🦨 Skunk</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.salt|Salt': {
        name: 'Blessing: 🧂 Salt',
        vrpName: 'Blessing: <span style="color:tomato">🧂 Salt</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.ice_cube|Ice Cube': {
        name: 'Blessing: 🧊 Ice Cube',
        vrpName: 'Blessing: <span style="color:tomato">🧊 Ice Cube</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.mermaid|Mermaid': {
        name: 'Blessing: 🧜‍♀️ Mermaid',
        vrpName: 'Blessing: <span style="color:tomato">🧜‍♀️ Mermaid</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp3.firecracker|Firecracker': {
        name: 'Blessing: 🧨 Firecracker',
        vrpName: 'Blessing: <span style="color:tomato">🧨 Firecracker</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.lotion_bottle|Lotion Bottle': {
        name: 'Blessing: 🧴 Lotion Bottle',
        vrpName: 'Blessing: <span style="color:tomato">🧴 Lotion Bottle</span>',
        weight: 0,
        isTruckingItem: false
    },
    'blessing_card|rp2.soap|Soap': {
        name: 'Blessing: 🧼 Soap',
        vrpName: 'Blessing: <span style="color:tomato">🧼 Soap</span>',
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|piloting|piloting': {
        name: 'Bonus EXP (Airline Pilot)',
        vrpName: "Bonus EXP (Airline Pilot)<span type='piloting-piloting'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|train|bus': {
        name: 'Bonus EXP (Bus Driver)',
        vrpName: "Bonus EXP (Bus Driver)<span type='train-bus'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|business|business': {
        name: 'Bonus EXP (Business)',
        vrpName: "Bonus EXP (Business)<span type='business-business'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|piloting|cargos': {
        name: 'Bonus EXP (Cargo Pilot)',
        vrpName: "Bonus EXP (Cargo Pilot)<span type='piloting-cargos'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|train|train': {
        name: 'Bonus EXP (Conductor)',
        vrpName: "Bonus EXP (Conductor)<span type='train-train'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|ems|ems': {
        name: 'Bonus EXP (EMS)',
        vrpName: "Bonus EXP (EMS)<span type='ems-ems'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|farming|farming': {
        name: 'Bonus EXP (Farming)',
        vrpName: "Bonus EXP (Farming)<span type='farming-farming'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|ems|fire': {
        name: 'Bonus EXP (Fire Fighter)',
        vrpName: "Bonus EXP (Fire Fighter)<span type='ems-fire'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|farming|fishing': {
        name: 'Bonus EXP (Fishing)',
        vrpName: "Bonus EXP (Fishing)<span type='farming-fishing'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|trucking|garbage': {
        name: 'Bonus EXP (Garbage Collections)',
        vrpName: "Bonus EXP (Garbage Collections)<span type='trucking-garbage'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|piloting|heli': {
        name: 'Bonus EXP (Helicopter Pilot)',
        vrpName: "Bonus EXP (Helicopter Pilot)<span type='piloting-heli'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|hunting|skill': {
        name: 'Bonus EXP (Hunting)',
        vrpName: "Bonus EXP (Hunting)<span type='hunting-skill'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|trucking|mechanic': {
        name: 'Bonus EXP (Mechanic)',
        vrpName: "Bonus EXP (Mechanic)<span type='trucking-mechanic'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|farming|mining': {
        name: 'Bonus EXP (Mining)',
        vrpName: "Bonus EXP (Mining)<span type='farming-mining'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|player|player': {
        name: 'Bonus EXP (Player)',
        vrpName: "Bonus EXP (Player)<span type='player-player'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|trucking|postop': {
        name: 'Bonus EXP (PostOP)',
        vrpName: "Bonus EXP (PostOP)<span type='trucking-postop'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|player|racing': {
        name: 'Bonus EXP (Racing)',
        vrpName: "Bonus EXP (Racing)<span type='player-racing'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|physical|strength': {
        name: 'Bonus EXP (Strength)',
        vrpName: "Bonus EXP (Strength)<span type='physical-strength'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token_a|trucking|trucking': {
        name: 'Bonus EXP (Trucking)',
        vrpName: "Bonus EXP (Trucking)<span type='trucking-trucking'/>",
        weight: 0,
        isTruckingItem: false
    },
    'bread': {
        name: 'Bread',
        vrpName: 'Bread',
        weight: 0,
        isTruckingItem: false
    },
    'biz_token': {
        name: 'Business Cash Stacks',
        vrpName: 'Business Cash Stacks',
        weight: 0,
        isTruckingItem: false
    },
    'ch24_cookie': {
        name: 'Christmas Cookie',
        vrpName: 'Christmas Cookie',
        weight: 1,
        isTruckingItem: false
    },
    'coffee': {
        name: 'Coffee',
        vrpName: 'Coffee',
        weight: 0,
        isTruckingItem: false
    },
    'collinsco_boat_voucher': {
        name: 'CollinsCo Boat Voucher',
        vrpName: 'CollinsCo Boat Voucher',
        weight: 0,
        isTruckingItem: false
    },
    'complete_meal': {
        name: 'Complete Meal',
        vrpName: "<span style='color:green'>Complete Meal</span>",
        weight: 0,
        isTruckingItem: false
    },
    'comp_alcohol': {
        name: 'Component: Alcohol',
        vrpName: 'Component: Alcohol',
        weight: 0,
        isTruckingItem: false
    },
    'comp_oil': {
        name: 'Component: Oil',
        vrpName: 'Component: Oil',
        weight: 0,
        isTruckingItem: false
    },
    'comp_paste': {
        name: 'Component: Paste',
        vrpName: 'Component: Paste',
        weight: 0,
        isTruckingItem: false
    },
    'comp_solid': {
        name: 'Component: Solid',
        vrpName: 'Component: Solid',
        weight: 0,
        isTruckingItem: false
    },
    'comp_waste': {
        name: 'Component: Waste',
        vrpName: 'Component: Waste',
        weight: 0,
        isTruckingItem: false
    },
    'comp_water': {
        name: 'Component: Water',
        vrpName: 'Component: Water',
        weight: 0,
        isTruckingItem: false
    },
    'pot_crab': {
        name: 'Crab Pot',
        vrpName: 'Crab Pot',
        weight: 4,
        isTruckingItem: false
    },
    'prefix_pack_1_reset': {
        name: 'Cursed Dice',
        vrpName: 'Cursed Dice',
        weight: 0,
        isTruckingItem: false
    },
    'title_card_custom': {
        name: 'Custom Title Card',
        vrpName: 'Custom Title Card',
        weight: 0,
        isTruckingItem: false
    },
    'defibkit': {
        name: 'Defibrillator Kit',
        vrpName: 'Defibrillator Kit',
        weight: 5,
        isTruckingItem: true
    },
    'digiscanner': {
        name: 'Digiscanner',
        vrpName: 'Digiscanner',
        weight: 0,
        isTruckingItem: false
    },
    'donut': {
        name: 'Donut',
        vrpName: 'Donut',
        weight: 0,
        isTruckingItem: false
    },
    'dxp_ticket': {
        name: 'Double EXP Ticket',
        vrpName: 'Double EXP Ticket',
        weight: 0,
        isTruckingItem: false
    },
    'ecola': {
        name: 'E-Cola',
        vrpName: 'E-Cola',
        weight: 0,
        isTruckingItem: false
    },
    'exp_bonus_ee2': {
        name: 'EXP Bonus: 10 (90 Minutes)',
        vrpName: 'EXP Bonus: 10&#37; (90 Minutes)',
        weight: 0,
        isTruckingItem: false
    },
    'exp_bonus_ee': {
        name: 'EXP Bonus: 15 (1 Hour)',
        vrpName: 'EXP Bonus: 15&#37; (1 Hour)',
        weight: 0,
        isTruckingItem: false
    },
    'exp_bonus_day': {
        name: 'EXP Bonus: 5 (1 Day)',
        vrpName: 'EXP Bonus: 5&#37; (1 Day)',
        weight: 0,
        isTruckingItem: false
    },
    'exp_bonus_week': {
        name: 'EXP Bonus: 5 (1 Week)',
        vrpName: 'EXP Bonus: 5&#37; (1 Week)',
        weight: 0,
        isTruckingItem: false
    },
    'exp_bonus_ee3': {
        name: 'EXP Bonus: 5 (2 Hours)',
        vrpName: 'EXP Bonus: 5&#37; (2 Hours)',
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|police|police': {
        name: 'EXP Token',
        vrpName: 'EXP Token',
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|piloting|piloting': {
        name: 'EXP Token (Airline Pilot)',
        vrpName: "EXP Token (Airline Pilot)<span type='piloting-piloting'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|train|bus': {
        name: 'EXP Token (Bus Driver)',
        vrpName: "EXP Token (Bus Driver)<span type='train-bus'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|business|business': {
        name: 'EXP Token (Business)',
        vrpName: "EXP Token (Business)<span type='business-business'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|piloting|cargos': {
        name: 'EXP Token (Cargo Pilot)',
        vrpName: "EXP Token (Cargo Pilot)<span type='piloting-cargos'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|train|train': {
        name: 'EXP Token (Conductor)',
        vrpName: "EXP Token (Conductor)<span type='train-train'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|ems|ems': {
        name: 'EXP Token (EMS)',
        vrpName: "EXP Token (EMS)<span type='ems-ems'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|ems|fire': {
        name: 'EXP Token (Fire Fighter)',
        vrpName: "EXP Token (Fire Fighter)<span type='ems-fire'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|farming|fishing': {
        name: 'EXP Token (Fishing)',
        vrpName: "EXP Token (Fishing)<span type='farming-fishing'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|trucking|garbage': {
        name: 'EXP Token (Garbage Collections)',
        vrpName: "EXP Token (Garbage Collections)<span type='trucking-garbage'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|piloting|heli': {
        name: 'EXP Token (Helicopter Pilot)',
        vrpName: "EXP Token (Helicopter Pilot)<span type='piloting-heli'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|hunting|skill': {
        name: 'EXP Token (Hunting)',
        vrpName: "EXP Token (Hunting)<span type='hunting-skill'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|farming|mining': {
        name: 'EXP Token (Mining)',
        vrpName: "EXP Token (Mining)<span type='farming-mining'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|player|player': {
        name: 'EXP Token (Player)',
        vrpName: "EXP Token (Player)<span type='player-player'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|trucking|postop': {
        name: 'EXP Token (PostOP)',
        vrpName: "EXP Token (PostOP)<span type='trucking-postop'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|player|racing': {
        name: 'EXP Token (Racing)',
        vrpName: "EXP Token (Racing)<span type='player-racing'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|physical|strength': {
        name: 'EXP Token (Strength)',
        vrpName: "EXP Token (Strength)<span type='physical-strength'/>",
        weight: 0,
        isTruckingItem: false
    },
    'exp_token|trucking|trucking': {
        name: 'EXP Token (Trucking)',
        vrpName: "EXP Token (Trucking)<span type='trucking-trucking'/>",
        weight: 0,
        isTruckingItem: false
    },
    'earplugs': {
        name: 'Earplugs',
        vrpName: 'Earplugs',
        weight: 0,
        isTruckingItem: false
    },
    'e_defibkit': {
        name: 'Empty Defibrillator Kit',
        vrpName: 'Empty Defibrillator Kit',
        weight: 5,
        isTruckingItem: false
    },
    'sd_encrypted': {
        name: 'Encrypted SD Card',
        vrpName: 'Encrypted SD Card',
        weight: 0,
        isTruckingItem: false
    },
    'redgull': {
        name: 'Energy Drink',
        vrpName: 'Energy Drink',
        weight: 0,
        isTruckingItem: false
    },
    'faction_money_card|250000': {
        name: 'Faction Credits Card: ₡250.00k',
        vrpName: 'Faction Credits Card: <span style="color:limegreen">₡250.00k</span>',
        weight: 0,
        isTruckingItem: false
    },
    'faction_money_card|50000': {
        name: 'Faction Credits Card: ₡50.00k',
        vrpName: 'Faction Credits Card: <span style="color:limegreen">₡50.00k</span>',
        weight: 0,
        isTruckingItem: false
    },
    'faction_money_card|500000': {
        name: 'Faction Credits Card: ₡500.00k',
        vrpName: 'Faction Credits Card: <span style="color:limegreen">₡500.00k</span>',
        weight: 0,
        isTruckingItem: false
    },
    'apple_seed': {
        name: 'Farming: Apple Seeds',
        vrpName: 'Farming: Apple Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'bacon': {
        name: 'Farming: Bacon',
        vrpName: 'Farming: Bacon',
        weight: 0.5,
        isTruckingItem: false
    },
    'banana_seed': {
        name: 'Farming: Banana Seeds',
        vrpName: 'Farming: Banana Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'beef': {
        name: 'Farming: Beef',
        vrpName: 'Farming: Beef',
        weight: 1,
        isTruckingItem: false
    },
    'blackberry_seed': {
        name: 'Farming: Blackberry Seeds',
        vrpName: 'Farming: Blackberry Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'blueberry_seed': {
        name: 'Farming: Blueberry Seeds',
        vrpName: 'Farming: Blueberry Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'carrot_seed': {
        name: 'Farming: Carrot Seeds',
        vrpName: 'Farming: Carrot Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'cherry_seed': {
        name: 'Farming: Cherry Seeds',
        vrpName: 'Farming: Cherry Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'corn_seed': {
        name: 'Farming: Corn Seeds',
        vrpName: 'Farming: Corn Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'eggs': {
        name: 'Farming: Eggs',
        vrpName: 'Farming: Eggs',
        weight: 0.1,
        isTruckingItem: false
    },
    'fertilizer': {
        name: 'Farming: Fertilizer',
        vrpName: 'Farming: Fertilizer',
        weight: 1,
        isTruckingItem: false
    },
    'processed_flour': {
        name: 'Farming: Flour',
        vrpName: 'Farming: Flour',
        weight: 0.1,
        isTruckingItem: false
    },
    'grape_seed': {
        name: 'Farming: Grape Seeds',
        vrpName: 'Farming: Grape Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'mango_seed': {
        name: 'Farming: Mango Seeds',
        vrpName: 'Farming: Mango Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'farm_milk': {
        name: 'Farming: Milk',
        vrpName: 'Farming: Milk',
        weight: 1,
        isTruckingItem: false
    },
    'orange_seed': {
        name: 'Farming: Orange Seeds',
        vrpName: 'Farming: Orange Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'peach_seed': {
        name: 'Farming: Peach Seeds',
        vrpName: 'Farming: Peach Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'pear_seed': {
        name: 'Farming: Pear Seeds',
        vrpName: 'Farming: Pear Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'pineapple_seed': {
        name: 'Farming: Pineapple Seeds',
        vrpName: 'Farming: Pineapple Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'pork': {
        name: 'Farming: Pork',
        vrpName: 'Farming: Pork',
        weight: 0.5,
        isTruckingItem: false
    },
    'potato_seed': {
        name: 'Farming: Potato Seeds',
        vrpName: 'Farming: Potato Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'converted_potatos': {
        name: 'Farming: Potatoes',
        vrpName: 'Farming: Potatoes',
        weight: 1,
        isTruckingItem: false
    },
    'pumpkin_seed': {
        name: 'Farming: Pumpkin Seeds',
        vrpName: 'Farming: Pumpkin Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'converted_pumpkins': {
        name: 'Farming: Pumpkins',
        vrpName: 'Farming: Pumpkins',
        weight: 1,
        isTruckingItem: false
    },
    'raspberry_seed': {
        name: 'Farming: Raspberry Seeds',
        vrpName: 'Farming: Raspberry Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'harvest_apples': {
        name: 'Farming: Raw Apples',
        vrpName: 'Farming: Raw Apples',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_blackberries': {
        name: 'Farming: Raw Blackberries',
        vrpName: 'Farming: Raw Blackberries',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_blueberries': {
        name: 'Farming: Raw Blueberries',
        vrpName: 'Farming: Raw Blueberries',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_carrots': {
        name: 'Farming: Raw Carrots',
        vrpName: 'Farming: Raw Carrots',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_cherries': {
        name: 'Farming: Raw Cherries',
        vrpName: 'Farming: Raw Cherries',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_corn': {
        name: 'Farming: Raw Corn',
        vrpName: 'Farming: Raw Corn',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_grapes': {
        name: 'Farming: Raw Grapes',
        vrpName: 'Farming: Raw Grapes',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_mangoes': {
        name: 'Farming: Raw Mangoes',
        vrpName: 'Farming: Raw Mangoes',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_oranges': {
        name: 'Farming: Raw Oranges',
        vrpName: 'Farming: Raw Oranges',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_peaches': {
        name: 'Farming: Raw Peaches',
        vrpName: 'Farming: Raw Peaches',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_potatos': {
        name: 'Farming: Raw Potatoes',
        vrpName: 'Farming: Raw Potatoes',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_pumpkins': {
        name: 'Farming: Raw Pumpkins',
        vrpName: 'Farming: Raw Pumpkins',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_raspberries': {
        name: 'Farming: Raw Raspberries',
        vrpName: 'Farming: Raw Raspberries',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_strawberries': {
        name: 'Farming: Raw Strawberries',
        vrpName: 'Farming: Raw Strawberries',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_sugar_cane': {
        name: 'Farming: Raw Sugar Cane',
        vrpName: 'Farming: Raw Sugar Cane',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_tomatos': {
        name: 'Farming: Raw Tomatoes',
        vrpName: 'Farming: Raw Tomatoes',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_watermelons': {
        name: 'Farming: Raw Watermelons',
        vrpName: 'Farming: Raw Watermelons',
        weight: 0,
        isTruckingItem: false
    },
    'harvest_wheat': {
        name: 'Farming: Raw Wheat',
        vrpName: 'Farming: Raw Wheat',
        weight: 0,
        isTruckingItem: false
    },
    'strawberry_seed': {
        name: 'Farming: Strawberry Seeds',
        vrpName: 'Farming: Strawberry Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'processed_sugar': {
        name: 'Farming: Sugar',
        vrpName: 'Farming: Sugar',
        weight: 1,
        isTruckingItem: false
    },
    'sugarcane_seed': {
        name: 'Farming: Sugar Cane Seeds',
        vrpName: 'Farming: Sugar Cane Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'tomato_seed': {
        name: 'Farming: Tomato Seeds',
        vrpName: 'Farming: Tomato Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'watermelon_seed': {
        name: 'Farming: Watermelon Seeds',
        vrpName: 'Farming: Watermelon Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'converted_wheat': {
        name: 'Farming: Wheat',
        vrpName: 'Farming: Wheat',
        weight: 1,
        isTruckingItem: false
    },
    'wheat_seed': {
        name: 'Farming: Wheat Seeds',
        vrpName: 'Farming: Wheat Seeds',
        weight: 1,
        isTruckingItem: false
    },
    'fidget_spinner': {
        name: 'Fidget Spinner',
        vrpName: '<span style="color:gold">Fidget Spinner</span>',
        weight: 0,
        isTruckingItem: false
    },
    'event_firework_battery': {
        name: 'Fireworks Battery',
        vrpName: 'Fireworks Battery',
        weight: 0,
        isTruckingItem: false
    },
    'event_firework_fountain': {
        name: 'Fireworks Fountain',
        vrpName: 'Fireworks Fountain',
        weight: 0,
        isTruckingItem: false
    },
    'event_firework_popper': {
        name: 'Fireworks Popper',
        vrpName: 'Fireworks Popper',
        weight: 0,
        isTruckingItem: false
    },
    'fish_meat': {
        name: 'Fish Meat',
        vrpName: 'Fish Meat',
        weight: 0.1,
        isTruckingItem: false
    },
    'fish_angelfish': {
        name: 'Fish: Angelfish',
        vrpName: 'Fish: Angelfish',
        weight: 0.5,
        isTruckingItem: false
    },
    'fish_cod': {
        name: 'Fish: Cod',
        vrpName: 'Fish: Cod',
        weight: 9.2,
        isTruckingItem: false
    },
    'fish_potcrab': {
        name: 'Fish: Crab',
        vrpName: 'Fish: Crab',
        weight: 5,
        isTruckingItem: false
    },
    'fish_frogfish': {
        name: 'Fish: Frogfish',
        vrpName: 'Fish: Frogfish',
        weight: 1,
        isTruckingItem: false
    },
    'fish_gobies': {
        name: 'Fish: Goby',
        vrpName: 'Fish: Goby',
        weight: 0.5,
        isTruckingItem: false
    },
    'fish_lobster': {
        name: 'Fish: Inshore Lizardfish',
        vrpName: 'Fish: Inshore Lizardfish',
        weight: 4,
        isTruckingItem: false
    },
    'fish_mackerel': {
        name: 'Fish: Mackerel',
        vrpName: 'Fish: Mackerel',
        weight: 1.9,
        isTruckingItem: false
    },
    'fish_monster_octopus': {
        name: 'Fish: Monster Octopus',
        vrpName: 'Fish: Monster Octopus',
        weight: 20,
        isTruckingItem: false
    },
    'fish_monster_shark': {
        name: 'Fish: Monster Shark',
        vrpName: 'Fish: Monster Shark',
        weight: 40,
        isTruckingItem: false
    },
    'fish_monster_whale': {
        name: 'Fish: Monster Whale',
        vrpName: 'Fish: Monster Whale',
        weight: 80,
        isTruckingItem: false
    },
    'fish_kingcrab': {
        name: 'Fish: Northern Searobin',
        vrpName: 'Fish: Northern Searobin',
        weight: 3,
        isTruckingItem: false
    },
    'fish_saithe': {
        name: 'Fish: Saithe',
        vrpName: 'Fish: Saithe',
        weight: 18,
        isTruckingItem: false
    },
    'fish_salmon': {
        name: 'Fish: Salmon',
        vrpName: 'Fish: Salmon',
        weight: 4.2,
        isTruckingItem: false
    },
    'fish_crab': {
        name: 'Fish: Sea Mullet',
        vrpName: 'Fish: Sea Mullet',
        weight: 1.4,
        isTruckingItem: false
    },
    'fish_trout': {
        name: 'Fish: Trout',
        vrpName: 'Fish: Trout',
        weight: 12,
        isTruckingItem: false
    },
    'fishing_tackle_epic': {
        name: 'Fishing: Epic Tackle',
        vrpName: 'Fishing: Epic Tackle',
        weight: 0,
        isTruckingItem: false
    },
    'fishing_tackle_legenday': {
        name: 'Fishing: Legendary Tackle',
        vrpName: 'Fishing: Legendary Tackle',
        weight: 0,
        isTruckingItem: false
    },
    'fishing_tackle_rare': {
        name: 'Fishing: Rare Tackle',
        vrpName: 'Fishing: Rare Tackle',
        weight: 0,
        isTruckingItem: false
    },
    'fishing_afk_rod': {
        name: 'Fishing: Shiny Rod',
        vrpName: 'Fishing: Shiny Rod',
        weight: 0,
        isTruckingItem: false
    },
    'fishing_tackle_uncommon': {
        name: 'Fishing: Tackle',
        vrpName: 'Fishing: Tackle',
        weight: 0,
        isTruckingItem: false
    },
    'flotsam': {
        name: 'Flotsam',
        vrpName: 'Flotsam',
        weight: 10,
        isTruckingItem: false
    },
    'fridge_dairy': {
        name: 'Fridge: Dairy Products',
        vrpName: 'Fridge: Dairy Products',
        weight: 15,
        isTruckingItem: false
    },
    'fridge_meat': {
        name: 'Fridge: Frozen Raw Meat',
        vrpName: 'Fridge: Frozen Raw Meat',
        weight: 15,
        isTruckingItem: false
    },
    'fridge_veggies': {
        name: 'Fridge: Vegetables',
        vrpName: 'Fridge: Vegetables',
        weight: 15,
        isTruckingItem: false
    },
    'garage_card|weevil|BF Weevil': {
        name: 'Garage Card: BF Weevil',
        vrpName: 'Garage Card: <span style="color:orange">BF Weevil</span>',
        weight: 0,
        isTruckingItem: false
    },
    'garage_card|zr350|ZR-350': {
        name: 'Garage Card: ZR-350',
        vrpName: 'Garage Card: <span style="color:orange">ZR-350</span>',
        weight: 0,
        isTruckingItem: false
    },
    'gocagola': {
        name: 'Goca Gola',
        vrpName: 'Goca Gola',
        weight: 0,
        isTruckingItem: false
    },
    'gut_knife': {
        name: 'Gut Knife',
        vrpName: '<span/>Gut Knife',
        weight: 15,
        isTruckingItem: false
    },
    'chest_halloween24': {
        name: 'Halloween 2024 Loot Bag',
        vrpName: "<span style= 'color:orange'>Halloween 2024 Loot Bag</span>",
        weight: 0,
        isTruckingItem: false
    },
    'candy24': {
        name: 'Halloween Candy',
        vrpName: 'Halloween Candy',
        weight: 0,
        isTruckingItem: false
    },
    'tavi_hardened_steel': {
        name: 'Hardened Steel',
        vrpName: 'Hardened Steel',
        weight: 10,
        isTruckingItem: false
    },
    'hunting_boost': {
        name: 'Hunters Formula',
        vrpName: 'Hunters Formula',
        weight: 0,
        isTruckingItem: false
    },
    'hunting_permit': {
        name: 'Hunting Permit',
        vrpName: 'Hunting Permit',
        weight: 0,
        isTruckingItem: false
    },
    'hide_boar': {
        name: 'Hunting: Boar',
        vrpName: 'Hunting: Boar',
        weight: 10,
        isTruckingItem: false
    },
    'hide_bear': {
        name: 'Hunting: Brown Bear',
        vrpName: 'Hunting: Brown Bear',
        weight: 20,
        isTruckingItem: false
    },
    'hide_cat': {
        name: 'Hunting: Cat',
        vrpName: 'Hunting: Cat',
        weight: 5,
        isTruckingItem: false
    },
    'hide_hawk': {
        name: 'Hunting: Chicken Hawk',
        vrpName: 'Hunting: Chicken Hawk',
        weight: 5,
        isTruckingItem: false
    },
    'hide_cormodant': {
        name: 'Hunting: Cormodant',
        vrpName: 'Hunting: Cormodant',
        weight: 8,
        isTruckingItem: false
    },
    'hide_mtlion': {
        name: 'Hunting: Cougar',
        vrpName: 'Hunting: Cougar',
        weight: 5,
        isTruckingItem: false
    },
    'hide_coyote': {
        name: 'Hunting: Coyote',
        vrpName: 'Hunting: Coyote',
        weight: 3,
        isTruckingItem: false
    },
    'hide_crow': {
        name: 'Hunting: Crow',
        vrpName: 'Hunting: Crow',
        weight: 3,
        isTruckingItem: false
    },
    'hide_deer': {
        name: 'Hunting: Deer',
        vrpName: 'Hunting: Deer',
        weight: 6,
        isTruckingItem: false
    },
    'hide_leopard': {
        name: 'Hunting: Leopard',
        vrpName: 'Hunting: Leopard',
        weight: 10,
        isTruckingItem: false
    },
    'hide_lion': {
        name: 'Hunting: Lion',
        vrpName: 'Hunting: Lion',
        weight: 10,
        isTruckingItem: false
    },
    'hide_rabbit': {
        name: 'Hunting: Rabbit',
        vrpName: 'Hunting: Rabbit',
        weight: 1,
        isTruckingItem: false
    },
    'hide_retriever': {
        name: 'Hunting: Retriever Dog',
        vrpName: 'Hunting: Retriever Dog',
        weight: 5,
        isTruckingItem: false
    },
    'hide_rottweiler': {
        name: 'Hunting: Rottweiler Dog',
        vrpName: 'Hunting: Rottweiler Dog',
        weight: 5,
        isTruckingItem: false
    },
    'hide_chop': {
        name: 'Hunting: Rottweiler Dog',
        vrpName: 'Hunting: Rottweiler Dog',
        weight: 5,
        isTruckingItem: false
    },
    'hide_seagull': {
        name: 'Hunting: Seagull',
        vrpName: 'Hunting: Seagull',
        weight: 3,
        isTruckingItem: false
    },
    'hide_wolf': {
        name: 'Hunting: Wolf',
        vrpName: 'Hunting: Wolf',
        weight: 10,
        isTruckingItem: false
    },
    'icetea': {
        name: 'Ice-Tea',
        vrpName: 'Ice-Tea',
        weight: 0,
        isTruckingItem: false
    },
    'hw24_jack_o_lantern': {
        name: "Jack O' Lantern",
        vrpName: "Jack O' Lantern",
        weight: 1,
        isTruckingItem: false
    },
    'jerry_can|HEAVY|Diesel': {
        name: 'Jerry Can (Diesel)',
        vrpName: 'Jerry Can (Diesel)',
        weight: 2,
        isTruckingItem: false
    },
    'jerry_can_empty': {
        name: 'Jerry Can (Empty)',
        vrpName: 'Jerry Can (Empty)',
        weight: 2,
        isTruckingItem: false
    },
    'jerry_can|HELICOPTER|Helicopter': {
        name: 'Jerry Can (Helicopter)',
        vrpName: 'Jerry Can (Helicopter)',
        weight: 2,
        isTruckingItem: false
    },
    'jerry_can|DIESEL|Petrol': {
        name: 'Jerry Can (Petrol)',
        vrpName: 'Jerry Can (Petrol)',
        weight: 2,
        isTruckingItem: false
    },
    'job_card|pilot': {
        name: 'Job Card: Airline Pilot',
        vrpName: 'Job Card: <span style="color:tomato">Airline Pilot</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|cargopilot': {
        name: 'Job Card: Cargo Pilot',
        vrpName: 'Job Card: <span style="color:tomato">Cargo Pilot</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|emergency': {
        name: 'Job Card: EMS / Paramedic',
        vrpName: 'Job Card: <span style="color:tomato">EMS / Paramedic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|fisher': {
        name: 'Job Card: Fisherman',
        vrpName: 'Job Card: <span style="color:tomato">Fisherman</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|helicopterpilot': {
        name: 'Job Card: Helicopter Pilot',
        vrpName: 'Job Card: <span style="color:tomato">Helicopter Pilot</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|mechanic': {
        name: 'Job Card: Mechanic',
        vrpName: 'Job Card: <span style="color:tomato">Mechanic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|trucker': {
        name: 'Job Card: Trucker',
        vrpName: 'Job Card: <span style="color:tomato">Trucker</span>',
        weight: 0,
        isTruckingItem: false
    },
    'job_card|hunter': {
        name: 'Job Card: Wildlife Hunter',
        vrpName: 'Job Card: <span style="color:tomato">Wildlife Hunter</span>',
        weight: 0,
        isTruckingItem: false
    },
    'kebab': {
        name: 'Kebab',
        vrpName: 'Kebab',
        weight: 0,
        isTruckingItem: false
    },
    'lemonlimonad': {
        name: 'Lemon Lemonade',
        vrpName: 'Lemon Lemonade',
        weight: 0,
        isTruckingItem: false
    },
    'liberty_voucher_fish': {
        name: 'Liberty: Fish Voucher',
        vrpName: 'Liberty: Fish Voucher',
        weight: 0,
        isTruckingItem: false
    },
    'liberty_voucher_goods': {
        name: 'Liberty: Goods Voucher',
        vrpName: 'Liberty: Goods Voucher',
        weight: 0,
        isTruckingItem: false
    },
    'liberty_token': {
        name: 'Liberty: Liberty City Token',
        vrpName: 'Liberty: Liberty City Token',
        weight: 0,
        isTruckingItem: false
    },
    'liberty_fish_portland': {
        name: 'Liberty: Portland Fish',
        vrpName: 'Liberty: Portland Fish',
        weight: 75,
        isTruckingItem: false
    },
    'liberty_fish_shoreside': {
        name: 'Liberty: Shoreside Fish',
        vrpName: 'Liberty: Shoreside Fish',
        weight: 75,
        isTruckingItem: false
    },
    'license_card|transfer': {
        name: 'License: Self Storage Transfer License',
        vrpName: 'License: <span style="color:tomato">Self Storage Transfer License</span>',
        weight: 0,
        isTruckingItem: false
    },
    'license_card|premium': {
        name: 'License: Tycoon Premium License',
        vrpName: 'License: <span style="color:tomato">Tycoon Premium License</span>',
        weight: 0,
        isTruckingItem: false
    },
    'pot_lobster': {
        name: 'Lobster Pot',
        vrpName: 'Lobster Pot',
        weight: 4,
        isTruckingItem: false
    },
    'mail': {
        name: 'Mail',
        vrpName: 'Mail',
        weight: 1,
        isTruckingItem: false
    },
    'mechanic_toolbox': {
        name: 'Master Toolbox',
        vrpName: "<span class='rainbow'>Master Toolbox</span>",
        weight: 5,
        isTruckingItem: false
    },
    'meat': {
        name: 'Meat',
        vrpName: 'Meat',
        weight: 0.5,
        isTruckingItem: false
    },
    'mech_card': {
        name: 'Mechanic Card',
        vrpName: 'Mechanic Card',
        weight: 0,
        isTruckingItem: false
    },
    'mechanic_hammer': {
        name: 'Mechanic: Hammer',
        vrpName: 'Mechanic: Hammer',
        weight: 5,
        isTruckingItem: false
    },
    'mechanic_wrench': {
        name: 'Mechanic: Wrench',
        vrpName: 'Mechanic: Wrench',
        weight: 5,
        isTruckingItem: false
    },
    'milk': {
        name: 'Milk',
        vrpName: 'Milk',
        weight: 0,
        isTruckingItem: false
    },
    'note|Armygamer|A Stinky Staff Note': {
        name: 'Note: Armygamer',
        vrpName: 'Note: Armygamer',
        weight: 0,
        isTruckingItem: false
    },
    'note|Car Meet 2024|The final car meet of 2024': {
        name: 'Note: Car Meet 2024',
        vrpName: 'Note: Car Meet 2024',
        weight: 0,
        isTruckingItem: false
    },
    'note|Christmas 2024| Merry Christmas from the tycoon dev team': {
        name: 'Note: Christmas 2024',
        vrpName: 'Note: Christmas 2024',
        weight: 0,
        isTruckingItem: false
    },
    'note|Cocoa Pebbles|A Stinky Staff Note': {
        name: 'Note: Cocoa Pebbles',
        vrpName: 'Note: Cocoa Pebbles',
        weight: 0,
        isTruckingItem: false
    },
    'note|Cyberskilzz|A Stinky Staff Note': {
        name: 'Note: Cyberskilzz',
        vrpName: 'Note: Cyberskilzz',
        weight: 0,
        isTruckingItem: false
    },
    'note|Extenze|': {
        name: 'Note: Extenze',
        vrpName: 'Note: Extenze',
        weight: 0,
        isTruckingItem: false
    },
    'note|Extenze|A Stinky Staff Note"': {
        name: 'Note: Extenze',
        vrpName: 'Note: Extenze',
        weight: 0,
        isTruckingItem: false
    },
    'note|Extenze|A Stinky Staff Note': {
        name: 'Note: Extenze',
        vrpName: 'Note: Extenze',
        weight: 0,
        isTruckingItem: false
    },
    'note|George|': {
        name: 'Note: George',
        vrpName: 'Note: George',
        weight: 0,
        isTruckingItem: false
    },
    'note|George|A Stinky Staff Note': {
        name: 'Note: George',
        vrpName: 'Note: George',
        weight: 0,
        isTruckingItem: false
    },
    'note|Glitch|The Awesome Staff Note': {
        name: 'Note: Glitch',
        vrpName: 'Note: Glitch',
        weight: 0,
        isTruckingItem: false
    },
    'note|GlitchDetector|A Stinky Staff Note': {
        name: 'Note: GlitchDetector',
        vrpName: 'Note: GlitchDetector',
        weight: 0,
        isTruckingItem: false
    },
    'note|Goobie|A Stinky Staff Note': {
        name: 'Note: Goobie',
        vrpName: 'Note: Goobie',
        weight: 0,
        isTruckingItem: false
    },
    'note|Heathrow Go Shower|': {
        name: 'Note: Heathrow Go Shower',
        vrpName: 'Note: Heathrow Go Shower',
        weight: 0,
        isTruckingItem: false
    },
    'note|Lewis|': {
        name: 'Note: Lewis',
        vrpName: 'Note: Lewis',
        weight: 0,
        isTruckingItem: false
    },
    'note|Netomnia|A Stinky Staff Note': {
        name: 'Note: Netomnia',
        vrpName: 'Note: Netomnia',
        weight: 0,
        isTruckingItem: false
    },
    'note|Nick|A Stinky Staff Note': {
        name: 'Note: Nick',
        vrpName: 'Note: Nick',
        weight: 0,
        isTruckingItem: false
    },
    'note|Nick|': {
        name: 'Note: Nick',
        vrpName: 'Note: Nick',
        weight: 0,
        isTruckingItem: false
    },
    'note|Niknakz|A Stinky Staff Note': {
        name: 'Note: Niknakz',
        vrpName: 'Note: Niknakz',
        weight: 0,
        isTruckingItem: false
    },
    'note|Part|A Stinky Staff Note': {
        name: 'Note: Part',
        vrpName: 'Note: Part',
        weight: 0,
        isTruckingItem: false
    },
    "note|Scare Card| you were expecting it to scream weren't you, nope im not that mean. Happy Halloween 2024!": {
        name: 'Note: Scare Card',
        vrpName: 'Note: Scare Card',
        weight: 0,
        isTruckingItem: false
    },
    'note|Scorpio|': {
        name: 'Note: Scorpio',
        vrpName: 'Note: Scorpio',
        weight: 0,
        isTruckingItem: false
    },
    'note|Scorpio|A Stinky Staff Note"': {
        name: 'Note: Scorpio',
        vrpName: 'Note: Scorpio',
        weight: 0,
        isTruckingItem: false
    },
    'note|Tom669933|A Stinky Staff Note': {
        name: 'Note: Tom669933',
        vrpName: 'Note: Tom669933',
        weight: 0,
        isTruckingItem: false
    },
    'free_business_card_25': {
        name: 'ONE FREE Business (25M)',
        vrpName: 'ONE FREE Business (25M)',
        weight: 0,
        isTruckingItem: false
    },
    'orangejuice': {
        name: 'Orange Juice',
        vrpName: 'Orange Juice',
        weight: 0,
        isTruckingItem: false
    },
    'phone_atm': {
        name: 'Phone Extension: Portable ATM',
        vrpName: 'Phone Extension: Portable ATM',
        weight: 0,
        isTruckingItem: false
    },
    'pills': {
        name: 'Pills',
        vrpName: 'Pills',
        weight: 0.1,
        isTruckingItem: false
    },
    'pdonut': {
        name: 'Premium Donut',
        vrpName: 'Premium Donut',
        weight: 0,
        isTruckingItem: false
    },
    'fish_meat_premium': {
        name: 'Premium Fish Meat',
        vrpName: 'Premium Fish Meat',
        weight: 0.1,
        isTruckingItem: false
    },
    'prospecting_scanner': {
        name: 'Prospecting Scanner',
        vrpName: 'Prospecting Scanner',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_1': {
        name: 'Prospecting: Bones',
        vrpName: 'Prospecting: Bones',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_6': {
        name: 'Prospecting: Bottle Caps',
        vrpName: 'Prospecting: Bottle Caps',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_10': {
        name: 'Prospecting: Bullet Casings',
        vrpName: 'Prospecting: Bullet Casings',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_4': {
        name: 'Prospecting: Dragon Scales',
        vrpName: 'Prospecting: Dragon Scales',
        weight: 0,
        isTruckingItem: false
    },
    'free_fall_card': {
        name: 'Prospecting: Dragon Wings',
        vrpName: 'Prospecting: Dragon Wings',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_8': {
        name: 'Prospecting: Electronics',
        vrpName: 'Prospecting: Electronics',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_9': {
        name: 'Prospecting: Firearm',
        vrpName: 'Prospecting: Firearm',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_3': {
        name: 'Prospecting: Golden Ring',
        vrpName: 'Prospecting: Golden Ring',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_2': {
        name: 'Prospecting: Nuts and Bolts',
        vrpName: 'Prospecting: Nuts and Bolts',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_7': {
        name: 'Prospecting: Rusty Cans',
        vrpName: 'Prospecting: Rusty Cans',
        weight: 0,
        isTruckingItem: false
    },
    'prosp_junk_5': {
        name: 'Prospecting: Scrap Metal',
        vrpName: 'Prospecting: Scrap Metal',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|manana2|Albany  Manana Custom': {
        name: 'R.T.S. Card: Albany  Manana Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany  Manana Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|buccaneer3|Albany Buccaneer': {
        name: 'R.T.S. Card: Albany Buccaneer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Buccaneer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|buccaneer|Albany Buccaneer': {
        name: 'R.T.S. Card: Albany Buccaneer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Buccaneer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|buccaneer2|Albany Buccaneer Custom': {
        name: 'R.T.S. Card: Albany Buccaneer Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Buccaneer Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cavalcade|Albany Cavalcade': {
        name: 'R.T.S. Card: Albany Cavalcade',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Cavalcade</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|emperor4|Albany Emperor Stretch': {
        name: 'R.T.S. Card: Albany Emperor Stretch',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Emperor Stretch</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|esperanto|Albany Esperanto (GTA IV)': {
        name: 'R.T.S. Card: Albany Esperanto (GTA IV)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Esperanto (GTA IV)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|btype2|Albany Fränken Stange': {
        name: 'R.T.S. Card: Albany Fränken Stange',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Fränken Stange</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hermes|Albany Hermes': {
        name: 'R.T.S. Card: Albany Hermes',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Hermes</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pres2|Albany Presidente VIOS': {
        name: 'R.T.S. Card: Albany Presidente VIOS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Presidente VIOS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|primov12|Albany Primo Club Racer': {
        name: 'R.T.S. Card: Albany Primo Club Racer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Primo Club Racer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|primo2|Albany Primo Custom': {
        name: 'R.T.S. Card: Albany Primo Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Primo Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|btype|Albany Roosevelt': {
        name: 'R.T.S. Card: Albany Roosevelt',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Roosevelt</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|btype3|Albany Roosevelt Valor': {
        name: 'R.T.S. Card: Albany Roosevelt Valor',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Roosevelt Valor</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vstr|Albany V-STR': {
        name: 'R.T.S. Card: Albany V-STR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany V-STR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|virgo|Albany Virgo': {
        name: 'R.T.S. Card: Albany Virgo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Virgo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|washington|Albany Washington': {
        name: 'R.T.S. Card: Albany Washington',
        vrpName: 'R.T.S. Card: <span style="color:orange">Albany Washington</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|elegy2|Annis Elegy RH8': {
        name: 'R.T.S. Card: Annis Elegy RH8',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Elegy RH8</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|elegy|Annis Elegy Retro Custom': {
        name: 'R.T.S. Card: Annis Elegy Retro Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Elegy Retro Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|euros|Annis Euros': {
        name: 'R.T.S. Card: Annis Euros',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Euros</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hellion|Annis Hellion': {
        name: 'R.T.S. Card: Annis Hellion',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Hellion</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lancea|Annis Lancea': {
        name: 'R.T.S. Card: Annis Lancea',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Lancea</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pinnacle|Annis Pinnacle': {
        name: 'R.T.S. Card: Annis Pinnacle',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Pinnacle</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|le7b|Annis RE-7B': {
        name: 'R.T.S. Card: Annis RE-7B',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis RE-7B</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|remus|Annis Remus': {
        name: 'R.T.S. Card: Annis Remus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis Remus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|s80|Annis S80RR': {
        name: 'R.T.S. Card: Annis S80RR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis S80RR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zr350ta|Annis ZR-350 T/A': {
        name: 'R.T.S. Card: Annis ZR-350 T/A',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis ZR-350 T/A</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zr350|Annis ZR350': {
        name: 'R.T.S. Card: Annis ZR350',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis ZR350</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zr380|Annis ZR380 Apocalypse': {
        name: 'R.T.S. Card: Annis ZR380 Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis ZR380 Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zr3802|Annis ZR380 Future Shock': {
        name: 'R.T.S. Card: Annis ZR380 Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis ZR380 Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zr3803|Annis ZR380 Nightmare': {
        name: 'R.T.S. Card: Annis ZR380 Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Annis ZR380 Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bifta|BF Bifta': {
        name: 'R.T.S. Card: BF Bifta',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Bifta</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|club|BF Club': {
        name: 'R.T.S. Card: BF Club',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Club</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dune|BF Dune Buggy': {
        name: 'R.T.S. Card: BF Dune Buggy',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Dune Buggy</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dune3|BF Dune FAV': {
        name: 'R.T.S. Card: BF Dune FAV',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Dune FAV</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|huesca|BF Huesca': {
        name: 'R.T.S. Card: BF Huesca',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Huesca</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bfinjection|BF Injection': {
        name: 'R.T.S. Card: BF Injection',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Injection</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|raptor|BF Raptor': {
        name: 'R.T.S. Card: BF Raptor',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Raptor</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|remidor|BF Remidor': {
        name: 'R.T.S. Card: BF Remidor',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Remidor</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|surfer|BF Surfer': {
        name: 'R.T.S. Card: BF Surfer',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Surfer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|weevil|BF Weevil': {
        name: 'R.T.S. Card: BF Weevil',
        vrpName: 'R.T.S. Card: <span style="color:orange">BF Weevil</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|openwheel1|Benefactor BR8': {
        name: 'R.T.S. Card: Benefactor BR8',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor BR8</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bruiser|Benefactor Bruiser Apocalypse': {
        name: 'R.T.S. Card: Benefactor Bruiser Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Bruiser Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bruiser2|Benefactor Bruiser Future Shock': {
        name: 'R.T.S. Card: Benefactor Bruiser Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Bruiser Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bruiser3|Benefactor Bruiser Nightmare': {
        name: 'R.T.S. Card: Benefactor Bruiser Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Bruiser Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dubsta|Benefactor Dubsta': {
        name: 'R.T.S. Card: Benefactor Dubsta',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Dubsta</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dubsta3|Benefactor Dubsta 6x6': {
        name: 'R.T.S. Card: Benefactor Dubsta 6x6',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Dubsta 6x6</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|feltzer2|Benefactor Feltzer': {
        name: 'R.T.S. Card: Benefactor Feltzer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Feltzer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|feltzer|Benefactor Feltzer Coupe': {
        name: 'R.T.S. Card: Benefactor Feltzer Coupe',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Feltzer Coupe</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|glendale2|Benefactor Glendale Custom': {
        name: 'R.T.S. Card: Benefactor Glendale Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Glendale Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|krieger|Benefactor Krieger': {
        name: 'R.T.S. Card: Benefactor Krieger',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Krieger</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|schaftergtr|Benefactor Schafter GTR': {
        name: 'R.T.S. Card: Benefactor Schafter GTR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Schafter GTR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|schafter4|Benefactor Schafter LWB': {
        name: 'R.T.S. Card: Benefactor Schafter LWB',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Schafter LWB</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|schafter6|Benefactor Schafter LWB (Armored)': {
        name: 'R.T.S. Card: Benefactor Schafter LWB (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Schafter LWB (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|schafter3|Benefactor Schafter V12': {
        name: 'R.T.S. Card: Benefactor Schafter V12',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Schafter V12</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|schafter5|Benefactor Schafter V12 (Armored)': {
        name: 'R.T.S. Card: Benefactor Schafter V12 (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Schafter V12 (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|schlagen|Benefactor Schlagen GT': {
        name: 'R.T.S. Card: Benefactor Schlagen GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Schlagen GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|spritzerdtm|Benefactor Spritzer DTM': {
        name: 'R.T.S. Card: Benefactor Spritzer DTM',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Spritzer DTM</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|spritzer|Benefactor Spritzer STR': {
        name: 'R.T.S. Card: Benefactor Spritzer STR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Spritzer STR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|feltzer3|Benefactor Stirling GT': {
        name: 'R.T.S. Card: Benefactor Stirling GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Stirling GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stretch3|Benefactor Stretch E': {
        name: 'R.T.S. Card: Benefactor Stretch E',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Stretch E</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|limo2|Benefactor Turreted Limo': {
        name: 'R.T.S. Card: Benefactor Turreted Limo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor Turreted Limo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|xls2|Benefactor XLS (Armored)': {
        name: 'R.T.S. Card: Benefactor XLS (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Benefactor XLS (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|prairie|Bollokan Prairie': {
        name: 'R.T.S. Card: Bollokan Prairie',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bollokan Prairie</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|banshee|Bravado Banshee': {
        name: 'R.T.S. Card: Bravado Banshee',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Banshee</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|banshee2|Bravado Banshee 900R': {
        name: 'R.T.S. Card: Bravado Banshee 900R',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Banshee 900R</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|buffalo2|Bravado Buffalo S': {
        name: 'R.T.S. Card: Bravado Buffalo S',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Buffalo S</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|buffalo4|Bravado Buffalo STX': {
        name: 'R.T.S. Card: Bravado Buffalo STX',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Buffalo STX</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dloader|Bravado Duneloader': {
        name: 'R.T.S. Card: Bravado Duneloader',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Duneloader</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|feroci|Bravado Feroci': {
        name: 'R.T.S. Card: Bravado Feroci',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Feroci</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gauntlet|Bravado Gauntlet': {
        name: 'R.T.S. Card: Bravado Gauntlet',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Gauntlet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gauntlet3|Bravado Gauntlet Classic': {
        name: 'R.T.S. Card: Bravado Gauntlet Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Gauntlet Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gauntlet4|Bravado Gauntlet Hellfire': {
        name: 'R.T.S. Card: Bravado Gauntlet Hellfire',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Gauntlet Hellfire</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ratloader|Bravado Rat-Loader': {
        name: 'R.T.S. Card: Bravado Rat-Loader',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Rat-Loader</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ratloader2|Bravado Rat-Truck': {
        name: 'R.T.S. Card: Bravado Rat-Truck',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Rat-Truck</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gauntlet2|Bravado Redwood Gauntlet': {
        name: 'R.T.S. Card: Bravado Redwood Gauntlet',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Redwood Gauntlet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rumpo|Bravado Rumpo': {
        name: 'R.T.S. Card: Bravado Rumpo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Rumpo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|buffalo3|Bravado Sprunk Buffalo': {
        name: 'R.T.S. Card: Bravado Sprunk Buffalo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Sprunk Buffalo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|verlierer2|Bravado Verlierer': {
        name: 'R.T.S. Card: Bravado Verlierer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Verlierer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|youga2|Bravado Youga Classic': {
        name: 'R.T.S. Card: Bravado Youga Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Youga Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|youga4|Bravado Youga Custom': {
        name: 'R.T.S. Card: Bravado Youga Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Bravado Youga Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bodhi2|Canis Bodhi': {
        name: 'R.T.S. Card: Canis Bodhi',
        vrpName: 'R.T.S. Card: <span style="color:orange">Canis Bodhi</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|crusader|Canis Crusader': {
        name: 'R.T.S. Card: Canis Crusader',
        vrpName: 'R.T.S. Card: <span style="color:orange">Canis Crusader</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|freecrawler|Canis Freecrawler': {
        name: 'R.T.S. Card: Canis Freecrawler',
        vrpName: 'R.T.S. Card: <span style="color:orange">Canis Freecrawler</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|kamacho|Canis Kamacho': {
        name: 'R.T.S. Card: Canis Kamacho',
        vrpName: 'R.T.S. Card: <span style="color:orange">Canis Kamacho</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|mesa|Canis Mesa': {
        name: 'R.T.S. Card: Canis Mesa',
        vrpName: 'R.T.S. Card: <span style="color:orange">Canis Mesa</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|seminole|Canis Seminole': {
        name: 'R.T.S. Card: Canis Seminole',
        vrpName: 'R.T.S. Card: <span style="color:orange">Canis Seminole</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fxt|Cavalcade FXT': {
        name: 'R.T.S. Card: Cavalcade FXT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Cavalcade FXT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|romero|Chariot Romero Hearse': {
        name: 'R.T.S. Card: Chariot Romero Hearse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Chariot Romero Hearse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|surge|Cheval Surge': {
        name: 'R.T.S. Card: Cheval Surge',
        vrpName: 'R.T.S. Card: <span style="color:orange">Cheval Surge</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|taipan|Cheval Taipan': {
        name: 'R.T.S. Card: Cheval Taipan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Cheval Taipan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|wombat|Cheval Wombat': {
        name: 'R.T.S. Card: Cheval Wombat',
        vrpName: 'R.T.S. Card: <span style="color:orange">Cheval Wombat</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|brawler|Coil Brawler': {
        name: 'R.T.S. Card: Coil Brawler',
        vrpName: 'R.T.S. Card: <span style="color:orange">Coil Brawler</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cyclone|Coil Cyclone': {
        name: 'R.T.S. Card: Coil Cyclone',
        vrpName: 'R.T.S. Card: <span style="color:orange">Coil Cyclone</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|raiden|Coil Raiden': {
        name: 'R.T.S. Card: Coil Raiden',
        vrpName: 'R.T.S. Card: <span style="color:orange">Coil Raiden</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|voltic2|Coil Rocket Voltic': {
        name: 'R.T.S. Card: Coil Rocket Voltic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Coil Rocket Voltic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|savanna|Coil Savanna': {
        name: 'R.T.S. Card: Coil Savanna',
        vrpName: 'R.T.S. Card: <span style="color:orange">Coil Savanna</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|voltic|Coil Voltic': {
        name: 'R.T.S. Card: Coil Voltic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Coil Voltic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|asea|Declasse Asea': {
        name: 'R.T.S. Card: Declasse Asea',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Asea</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|brutus|Declasse Brutus Apocalypse': {
        name: 'R.T.S. Card: Declasse Brutus Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Brutus Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|brutus2|Declasse Brutus Future Shock': {
        name: 'R.T.S. Card: Declasse Brutus Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Brutus Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|brutus3|Declasse Brutus Nightmare': {
        name: 'R.T.S. Card: Declasse Brutus Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Brutus Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stalion2|Declasse Burger Shot Stallion': {
        name: 'R.T.S. Card: Declasse Burger Shot Stallion',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Burger Shot Stallion</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|openwheel2|Declasse DR1': {
        name: 'R.T.S. Card: Declasse DR1',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse DR1</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tampa2|Declasse Drift Tampa': {
        name: 'R.T.S. Card: Declasse Drift Tampa',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Drift Tampa</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|yosemite2|Declasse Drift Yosemite': {
        name: 'R.T.S. Card: Declasse Drift Yosemite',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Drift Yosemite</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gburrito2|Declasse Gang Burrito': {
        name: 'R.T.S. Card: Declasse Gang Burrito',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Gang Burrito</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|granger|Declasse Granger': {
        name: 'R.T.S. Card: Declasse Granger',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Granger</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|granger2|Declasse Granger 3600LX': {
        name: 'R.T.S. Card: Declasse Granger 3600LX',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Granger 3600LX</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hotring|Declasse Hotring Sabre': {
        name: 'R.T.S. Card: Declasse Hotring Sabre',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Hotring Sabre</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|impaler|Declasse Impaler': {
        name: 'R.T.S. Card: Declasse Impaler',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Impaler</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|impaler2|Declasse Impaler Apocalypse': {
        name: 'R.T.S. Card: Declasse Impaler Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Impaler Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|impaler3|Declasse Impaler Future Shock': {
        name: 'R.T.S. Card: Declasse Impaler Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Impaler Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|impaler4|Declasse Impaler Nightmare': {
        name: 'R.T.S. Card: Declasse Impaler Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Impaler Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|mamba|Declasse Mamba': {
        name: 'R.T.S. Card: Declasse Mamba',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Mamba</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|merit|Declasse Merit': {
        name: 'R.T.S. Card: Declasse Merit',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Merit</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|taxi2|Declasse Merit Taxi': {
        name: 'R.T.S. Card: Declasse Merit Taxi',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Merit Taxi</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rancher|Declasse Rancher SWB': {
        name: 'R.T.S. Card: Declasse Rancher SWB',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Rancher SWB</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rancherxl|Declasse Rancher XL': {
        name: 'R.T.S. Card: Declasse Rancher XL',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Rancher XL</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|riva|Declasse Riva': {
        name: 'R.T.S. Card: Declasse Riva',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Riva</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sabre|Declasse Sabre': {
        name: 'R.T.S. Card: Declasse Sabre',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Sabre</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sabregt2|Declasse Sabre Turbo Custom': {
        name: 'R.T.S. Card: Declasse Sabre Turbo Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Sabre Turbo Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|scramjet|Declasse Scramjet': {
        name: 'R.T.S. Card: Declasse Scramjet',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Scramjet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tampa3|Declasse Tampa': {
        name: 'R.T.S. Card: Declasse Tampa',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Tampa</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tampa|Declasse Tampa': {
        name: 'R.T.S. Card: Declasse Tampa',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Tampa</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tornado5|Declasse Tornado Custom': {
        name: 'R.T.S. Card: Declasse Tornado Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Tornado Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tornado6|Declasse Tornado Rat Rod': {
        name: 'R.T.S. Card: Declasse Tornado Rat Rod',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Tornado Rat Rod</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tulip|Declasse Tulip': {
        name: 'R.T.S. Card: Declasse Tulip',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Tulip</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vigerob|Declasse Vigero Beater': {
        name: 'R.T.S. Card: Declasse Vigero Beater',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Vigero Beater</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|voodoo|Declasse Voodoo': {
        name: 'R.T.S. Card: Declasse Voodoo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Voodoo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|yosemite|Declasse Yosemite': {
        name: 'R.T.S. Card: Declasse Yosemite',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Yosemite</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|yosemite3|Declasse Yosemite': {
        name: 'R.T.S. Card: Declasse Yosemite',
        vrpName: 'R.T.S. Card: <span style="color:orange">Declasse Yosemite</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|champion|Dewbauchee Champion': {
        name: 'R.T.S. Card: Dewbauchee Champion',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Champion</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|exemplar|Dewbauchee Exemplar': {
        name: 'R.T.S. Card: Dewbauchee Exemplar',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Exemplar</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jb700|Dewbauchee JB 700': {
        name: 'R.T.S. Card: Dewbauchee JB 700',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee JB 700</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jb7002|Dewbauchee JB 700W': {
        name: 'R.T.S. Card: Dewbauchee JB 700W',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee JB 700W</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|massacro|Dewbauchee Massacro': {
        name: 'R.T.S. Card: Dewbauchee Massacro',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Massacro</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|massacro2|Dewbauchee Massacro (Racecar)': {
        name: 'R.T.S. Card: Dewbauchee Massacro (Racecar)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Massacro (Racecar)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rapidgt|Dewbauchee Rapid GT': {
        name: 'R.T.S. Card: Dewbauchee Rapid GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Rapid GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rapidgt3|Dewbauchee Rapid GT Classic': {
        name: 'R.T.S. Card: Dewbauchee Rapid GT Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Rapid GT Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|seven70|Dewbauchee Seven-70': {
        name: 'R.T.S. Card: Dewbauchee Seven-70',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Seven-70</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|specter|Dewbauchee Specter': {
        name: 'R.T.S. Card: Dewbauchee Specter',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Specter</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|specter2|Dewbauchee Specter Custom': {
        name: 'R.T.S. Card: Dewbauchee Specter Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Specter Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|supergt|Dewbauchee SuperGT': {
        name: 'R.T.S. Card: Dewbauchee SuperGT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee SuperGT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vagner|Dewbauchee Vagner': {
        name: 'R.T.S. Card: Dewbauchee Vagner',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dewbauchee Vagner</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|akuma|Dinka Akuma': {
        name: 'R.T.S. Card: Dinka Akuma',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Akuma</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blista|Dinka Blista': {
        name: 'R.T.S. Card: Dinka Blista',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Blista</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blista2|Dinka Blista Compact': {
        name: 'R.T.S. Card: Dinka Blista Compact',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Blista Compact</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blistata|Dinka Blista Compact T/A': {
        name: 'R.T.S. Card: Dinka Blista Compact T/A',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Blista Compact T/A</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|kanjo|Dinka Blista Kanjo': {
        name: 'R.T.S. Card: Dinka Blista Kanjo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Blista Kanjo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|chavos|Dinka Chavos': {
        name: 'R.T.S. Card: Dinka Chavos',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Chavos</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|chavos2|Dinka Chavos S': {
        name: 'R.T.S. Card: Dinka Chavos S',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Chavos S</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|double|Dinka Double-T': {
        name: 'R.T.S. Card: Dinka Double-T',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Double-T</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|double2|Dinka Double-T Custom': {
        name: 'R.T.S. Card: Dinka Double-T Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Double-T Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|enduro|Dinka Enduro': {
        name: 'R.T.S. Card: Dinka Enduro',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Enduro</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blista3|Dinka Go Go Monkey Blista': {
        name: 'R.T.S. Card: Dinka Go Go Monkey Blista',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Go Go Monkey Blista</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hakumai|Dinka Hakumai': {
        name: 'R.T.S. Card: Dinka Hakumai',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Hakumai</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jester|Dinka Jester': {
        name: 'R.T.S. Card: Dinka Jester',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Jester</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jester2|Dinka Jester (Racecar)': {
        name: 'R.T.S. Card: Dinka Jester (Racecar)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Jester (Racecar)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jester3|Dinka Jester Classic': {
        name: 'R.T.S. Card: Dinka Jester Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Jester Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jester4|Dinka Jester Sport': {
        name: 'R.T.S. Card: Dinka Jester Sport',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Jester Sport</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jesterv12|Dinka Jester Super Secret': {
        name: 'R.T.S. Card: Dinka Jester Super Secret',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Jester Super Secret</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|perennial2|Dinka Perennial FlyUS': {
        name: 'R.T.S. Card: Dinka Perennial FlyUS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Perennial FlyUS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rt3000|Dinka RT3000': {
        name: 'R.T.S. Card: Dinka RT3000',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka RT3000</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sugoi|Dinka Sugoi': {
        name: 'R.T.S. Card: Dinka Sugoi',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Sugoi</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|veto|Dinka Veto Classic': {
        name: 'R.T.S. Card: Dinka Veto Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Veto Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|veto2|Dinka Veto Modern': {
        name: 'R.T.S. Card: Dinka Veto Modern',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Veto Modern</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vindicator|Dinka Vindicator': {
        name: 'R.T.S. Card: Dinka Vindicator',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dinka Vindicator</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|landstalker|Dundreary Landstalker': {
        name: 'R.T.S. Card: Dundreary Landstalker',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Landstalker</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|regina|Dundreary Regina': {
        name: 'R.T.S. Card: Dundreary Regina',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Regina</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|regina3|Dundreary Regina Sedan': {
        name: 'R.T.S. Card: Dundreary Regina Sedan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Regina Sedan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stretch2|Dundreary Stretch': {
        name: 'R.T.S. Card: Dundreary Stretch',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Stretch</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stretch|Dundreary Stretch': {
        name: 'R.T.S. Card: Dundreary Stretch',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Stretch</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|virgo3|Dundreary Virgo Classic': {
        name: 'R.T.S. Card: Dundreary Virgo Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Virgo Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|virgo2|Dundreary Virgo Classic Custom': {
        name: 'R.T.S. Card: Dundreary Virgo Classic Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Dundreary Virgo Classic Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sheava|Emperor ETR1': {
        name: 'R.T.S. Card: Emperor ETR1',
        vrpName: 'R.T.S. Card: <span style="color:orange">Emperor ETR1</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|habanero|Emperor Habanero': {
        name: 'R.T.S. Card: Emperor Habanero',
        vrpName: 'R.T.S. Card: <span style="color:orange">Emperor Habanero</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lokus|Emperor Lokus': {
        name: 'R.T.S. Card: Emperor Lokus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Emperor Lokus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vectre|Emperor Vectre': {
        name: 'R.T.S. Card: Emperor Vectre',
        vrpName: 'R.T.S. Card: <span style="color:orange">Emperor Vectre</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hpr1|Entara HPR-1': {
        name: 'R.T.S. Card: Entara HPR-1',
        vrpName: 'R.T.S. Card: <span style="color:orange">Entara HPR-1</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hpr1|Entara HPR-1 &': {
        name: 'R.T.S. Card: Entara HPR-1 &',
        vrpName: 'R.T.S. Card: <span style="color:orange">Entara HPR-1 &</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cognoscenti|Enus Cognoscenti': {
        name: 'R.T.S. Card: Enus Cognoscenti',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Cognoscenti</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cognoscenti2|Enus Cognoscenti (Armored)': {
        name: 'R.T.S. Card: Enus Cognoscenti (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Cognoscenti (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cog55|Enus Cognoscenti 55': {
        name: 'R.T.S. Card: Enus Cognoscenti 55',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Cognoscenti 55</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cog552|Enus Cognoscenti 55 (Armored)': {
        name: 'R.T.S. Card: Enus Cognoscenti 55 (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Cognoscenti 55 (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cogcabrio|Enus Cognoscenti Cabrio': {
        name: 'R.T.S. Card: Enus Cognoscenti Cabrio',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Cognoscenti Cabrio</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deity|Enus Deity': {
        name: 'R.T.S. Card: Enus Deity',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Deity</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|huntley|Enus Huntley S': {
        name: 'R.T.S. Card: Enus Huntley S',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Huntley S</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jubilee|Enus Jubilee': {
        name: 'R.T.S. Card: Enus Jubilee',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Jubilee</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|paragon|Enus Paragon R': {
        name: 'R.T.S. Card: Enus Paragon R',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Paragon R</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|paragon2|Enus Paragon R (Armored)': {
        name: 'R.T.S. Card: Enus Paragon R (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Paragon R (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|superd2|Enus Super Drop Diamond': {
        name: 'R.T.S. Card: Enus Super Drop Diamond',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Super Drop Diamond</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|windsor|Enus Windsor': {
        name: 'R.T.S. Card: Enus Windsor',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Windsor</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|windsor2|Enus Windsor Drop': {
        name: 'R.T.S. Card: Enus Windsor Drop',
        vrpName: 'R.T.S. Card: <span style="color:orange">Enus Windsor Drop</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fq2|Fathom FQ 2': {
        name: 'R.T.S. Card: Fathom FQ 2',
        vrpName: 'R.T.S. Card: <span style="color:orange">Fathom FQ 2</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|airportferoci|FlyUS Feroci': {
        name: 'R.T.S. Card: FlyUS Feroci',
        vrpName: 'R.T.S. Card: <span style="color:orange">FlyUS Feroci</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|airportperennial|FlyUS Perennial': {
        name: 'R.T.S. Card: FlyUS Perennial',
        vrpName: 'R.T.S. Card: <span style="color:orange">FlyUS Perennial</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|baller2|Gallivanter Baller': {
        name: 'R.T.S. Card: Gallivanter Baller',
        vrpName: 'R.T.S. Card: <span style="color:orange">Gallivanter Baller</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|baller3|Gallivanter Baller LE': {
        name: 'R.T.S. Card: Gallivanter Baller LE',
        vrpName: 'R.T.S. Card: <span style="color:orange">Gallivanter Baller LE</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|baller5|Gallivanter Baller LE (Armored)': {
        name: 'R.T.S. Card: Gallivanter Baller LE (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Gallivanter Baller LE (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|baller4|Gallivanter Baller LE LWB': {
        name: 'R.T.S. Card: Gallivanter Baller LE LWB',
        vrpName: 'R.T.S. Card: <span style="color:orange">Gallivanter Baller LE LWB</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|baller6|Gallivanter Baller LE LWB (Armored)': {
        name: 'R.T.S. Card: Gallivanter Baller LE LWB (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Gallivanter Baller LE LWB (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|baller7|Gallivanter Baller ST': {
        name: 'R.T.S. Card: Gallivanter Baller ST',
        vrpName: 'R.T.S. Card: <span style="color:orange">Gallivanter Baller ST</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bestiagts|Grotti Bestia GTS': {
        name: 'R.T.S. Card: Grotti Bestia GTS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Bestia GTS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|brioso2|Grotti Brioso 300': {
        name: 'R.T.S. Card: Grotti Brioso 300',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Brioso 300</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|brioso|Grotti Brioso R/A': {
        name: 'R.T.S. Card: Grotti Brioso R/A',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Brioso R/A</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|carbonizzare|Grotti Carbonizzare': {
        name: 'R.T.S. Card: Grotti Carbonizzare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Carbonizzare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cheetah|Grotti Cheetah': {
        name: 'R.T.S. Card: Grotti Cheetah',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Cheetah</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cheetah2|Grotti Cheetah Classic': {
        name: 'R.T.S. Card: Grotti Cheetah Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Cheetah Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cheetah3|Grotti Cheetah Classic Custom': {
        name: 'R.T.S. Card: Grotti Cheetah Classic Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Cheetah Classic Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|furia|Grotti Furia': {
        name: 'R.T.S. Card: Grotti Furia',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Furia</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|italigto|Grotti Itali GTO': {
        name: 'R.T.S. Card: Grotti Itali GTO',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Itali GTO</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|italirsx|Grotti Itali RSX': {
        name: 'R.T.S. Card: Grotti Itali RSX',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Itali RSX</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|turismo|Grotti Turismo': {
        name: 'R.T.S. Card: Grotti Turismo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Turismo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|turismo2|Grotti Turismo Classic': {
        name: 'R.T.S. Card: Grotti Turismo Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Turismo Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|turismor|Grotti Turismo R': {
        name: 'R.T.S. Card: Grotti Turismo R',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Turismo R</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vigilante|Grotti Vigilante': {
        name: 'R.T.S. Card: Grotti Vigilante',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Vigilante</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|visione|Grotti Visione': {
        name: 'R.T.S. Card: Grotti Visione',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti Visione</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|prototipo|Grotti X80 Proto': {
        name: 'R.T.S. Card: Grotti X80 Proto',
        vrpName: 'R.T.S. Card: <span style="color:orange">Grotti X80 Proto</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|barrage|HVY Barrage': {
        name: 'R.T.S. Card: HVY Barrage',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Barrage</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|insurgent2|HVY Insurgent': {
        name: 'R.T.S. Card: HVY Insurgent',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Insurgent</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|insurgent|HVY Insurgent Pick-Up': {
        name: 'R.T.S. Card: HVY Insurgent Pick-Up',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Insurgent Pick-Up</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|insurgent3|HVY Insurgent Pick-Up Custom': {
        name: 'R.T.S. Card: HVY Insurgent Pick-Up Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Insurgent Pick-Up Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|menacer|HVY Menacer': {
        name: 'R.T.S. Card: HVY Menacer',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Menacer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nightshark|HVY Nightshark': {
        name: 'R.T.S. Card: HVY Nightshark',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Nightshark</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|scarab|HVY Scarab Apocalypse': {
        name: 'R.T.S. Card: HVY Scarab Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Scarab Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|scarab2|HVY Scarab Future Shock': {
        name: 'R.T.S. Card: HVY Scarab Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Scarab Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|scarab3|HVY Scarab Nightmare': {
        name: 'R.T.S. Card: HVY Scarab Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">HVY Scarab Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|khamelion|Hijak Khamelion': {
        name: 'R.T.S. Card: Hijak Khamelion',
        vrpName: 'R.T.S. Card: <span style="color:orange">Hijak Khamelion</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ruston|Hijak Ruston': {
        name: 'R.T.S. Card: Hijak Ruston',
        vrpName: 'R.T.S. Card: <span style="color:orange">Hijak Ruston</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vertice|Hijak Vertice': {
        name: 'R.T.S. Card: Hijak Vertice',
        vrpName: 'R.T.S. Card: <span style="color:orange">Hijak Vertice</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dukes3|Imponte  Beater Dukes': {
        name: 'R.T.S. Card: Imponte  Beater Dukes',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte  Beater Dukes</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|df8|Imponte DF8': {
        name: 'R.T.S. Card: Imponte DF8',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte DF8</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deluxogt|Imponte Deluxo GT': {
        name: 'R.T.S. Card: Imponte Deluxo GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Deluxo GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dukes2|Imponte Duke O': {
        name: 'R.T.S. Card: Imponte Duke O',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Duke O</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dukes2|Imponte Duke O&': {
        name: 'R.T.S. Card: Imponte Duke O&',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Duke O&</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dukes|Imponte Dukes': {
        name: 'R.T.S. Card: Imponte Dukes',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Dukes</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nightshade|Imponte Nightshade': {
        name: 'R.T.S. Card: Imponte Nightshade',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Nightshade</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|phoenix|Imponte Phoenix': {
        name: 'R.T.S. Card: Imponte Phoenix',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Phoenix</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|phoenix2|Imponte Phoenix T-Top': {
        name: 'R.T.S. Card: Imponte Phoenix T-Top',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Phoenix T-Top</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ruiner2|Imponte Ruiner 2000': {
        name: 'R.T.S. Card: Imponte Ruiner 2000',
        vrpName: 'R.T.S. Card: <span style="color:orange">Imponte Ruiner 2000</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|coquette4|Inverto Coquette D10': {
        name: 'R.T.S. Card: Inverto Coquette D10',
        vrpName: 'R.T.S. Card: <span style="color:orange">Inverto Coquette D10</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|coquette|Invetero Coquette': {
        name: 'R.T.S. Card: Invetero Coquette',
        vrpName: 'R.T.S. Card: <span style="color:orange">Invetero Coquette</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|coquette3|Invetero Coquette BlackFin': {
        name: 'R.T.S. Card: Invetero Coquette BlackFin',
        vrpName: 'R.T.S. Card: <span style="color:orange">Invetero Coquette BlackFin</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|coquette2|Invetero Coquette Classic': {
        name: 'R.T.S. Card: Invetero Coquette Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Invetero Coquette Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|remower|Jacksheepe Lawn Mower RS': {
        name: 'R.T.S. Card: Jacksheepe Lawn Mower RS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Jacksheepe Lawn Mower RS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|z190|Karin 190z': {
        name: 'R.T.S. Card: Karin 190z',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin 190z</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|asterope|Karin Asterope': {
        name: 'R.T.S. Card: Karin Asterope',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Asterope</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|asteropers|Karin Asterope RS': {
        name: 'R.T.S. Card: Karin Asterope RS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Asterope RS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bjxl|Karin BeeJay XL': {
        name: 'R.T.S. Card: Karin BeeJay XL',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin BeeJay XL</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|calico|Karin Calico': {
        name: 'R.T.S. Card: Karin Calico',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Calico</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dilettante|Karin Dilettante': {
        name: 'R.T.S. Card: Karin Dilettante',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Dilettante</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dilettantedx|Karin Dilettante DX': {
        name: 'R.T.S. Card: Karin Dilettante DX',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Dilettante DX</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|everon|Karin Everon': {
        name: 'R.T.S. Card: Karin Everon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Everon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|futo2|Karin Futo GT Hatch': {
        name: 'R.T.S. Card: Karin Futo GT Hatch',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Futo GT Hatch</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|futota|Karin Futo T/A': {
        name: 'R.T.S. Card: Karin Futo T/A',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Futo T/A</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|intruder|Karin Intruder': {
        name: 'R.T.S. Card: Karin Intruder',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Intruder</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|kuruma|Karin Kuruma': {
        name: 'R.T.S. Card: Karin Kuruma',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Kuruma</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|kuruma2|Karin Kuruma (Armored)': {
        name: 'R.T.S. Card: Karin Kuruma (Armored)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Kuruma (Armored)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|kurumata|Karin Kuruma T/A Mk.I': {
        name: 'R.T.S. Card: Karin Kuruma T/A Mk.I',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Kuruma T/A Mk.I</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|previon|Karin Previon': {
        name: 'R.T.S. Card: Karin Previon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Previon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rebel2|Karin Rebel': {
        name: 'R.T.S. Card: Karin Rebel',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Rebel</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rebel|Karin Rusty Rebel': {
        name: 'R.T.S. Card: Karin Rusty Rebel',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Rusty Rebel</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sultan|Karin Sultan': {
        name: 'R.T.S. Card: Karin Sultan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Sultan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sultan2|Karin Sultan Classic': {
        name: 'R.T.S. Card: Karin Sultan Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Sultan Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sultanrs|Karin Sultan RS': {
        name: 'R.T.S. Card: Karin Sultan RS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Sultan RS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sultanr|Karin Sultan Rally': {
        name: 'R.T.S. Card: Karin Sultan Rally',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Sultan Rally</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sultans|Karin Sultan-S': {
        name: 'R.T.S. Card: Karin Sultan-S',
        vrpName: 'R.T.S. Card: <span style="color:orange">Karin Sultan-S</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|avarus|LCC Avarus': {
        name: 'R.T.S. Card: LCC Avarus',
        vrpName: 'R.T.S. Card: <span style="color:orange">LCC Avarus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hexer|LCC Hexer': {
        name: 'R.T.S. Card: LCC Hexer',
        vrpName: 'R.T.S. Card: <span style="color:orange">LCC Hexer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sanctus|LCC Sanctus': {
        name: 'R.T.S. Card: LCC Sanctus',
        vrpName: 'R.T.S. Card: <span style="color:orange">LCC Sanctus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lp700r|Lamborghini Aventador LP700-4 Roadster': {
        name: 'R.T.S. Card: Lamborghini Aventador LP700-4 Roadster',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lamborghini Aventador LP700-4 Roadster</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|penne|Lampadati 169 Penne': {
        name: 'R.T.S. Card: Lampadati 169 Penne',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati 169 Penne</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|casco|Lampadati Casco': {
        name: 'R.T.S. Card: Lampadati Casco',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Casco</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cinquemila|Lampadati Cinquemila': {
        name: 'R.T.S. Card: Lampadati Cinquemila',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Cinquemila</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|furoregt|Lampadati Furore GT': {
        name: 'R.T.S. Card: Lampadati Furore GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Furore GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|komoda|Lampadati Komoda': {
        name: 'R.T.S. Card: Lampadati Komoda',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Komoda</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|michelli|Lampadati Michelli GT': {
        name: 'R.T.S. Card: Lampadati Michelli GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Michelli GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pigth|Lampadati Pigalle Camper': {
        name: 'R.T.S. Card: Lampadati Pigalle Camper',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Pigalle Camper</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tigon|Lampadati Tigon': {
        name: 'R.T.S. Card: Lampadati Tigon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Tigon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tropos|Lampadati Tropos Rallye': {
        name: 'R.T.S. Card: Lampadati Tropos Rallye',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Tropos Rallye</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|viseris|Lampadati Viseris': {
        name: 'R.T.S. Card: Lampadati Viseris',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lampadati Viseris</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tanajura|Lemanjá Tanajura': {
        name: 'R.T.S. Card: Lemanjá Tanajura',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lemanjá Tanajura</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rc350|Lexus RC 350': {
        name: 'R.T.S. Card: Lexus RC 350',
        vrpName: 'R.T.S. Card: <span style="color:orange">Lexus RC 350</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lycan|Liberty Chop Shop Lycan': {
        name: 'R.T.S. Card: Liberty Chop Shop Lycan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Liberty Chop Shop Lycan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lycan2|Liberty Chop Shop Lycan Custom': {
        name: 'R.T.S. Card: Liberty Chop Shop Lycan Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Liberty Chop Shop Lycan Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nightblade2|Liberty Chop Shop Nightblade': {
        name: 'R.T.S. Card: Liberty Chop Shop Nightblade',
        vrpName: 'R.T.S. Card: <span style="color:orange">Liberty Chop Shop Nightblade</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rallytruck|MTL Dune': {
        name: 'R.T.S. Card: MTL Dune',
        vrpName: 'R.T.S. Card: <span style="color:orange">MTL Dune</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|manchez|Maibatsu Manchez': {
        name: 'R.T.S. Card: Maibatsu Manchez',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Manchez</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|manchez2|Maibatsu Manchez Scout': {
        name: 'R.T.S. Card: Maibatsu Manchez Scout',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Manchez Scout</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|penumbra2|Maibatsu Penubra FF': {
        name: 'R.T.S. Card: Maibatsu Penubra FF',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Penubra FF</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|penumbra|Maibatsu Penumbra': {
        name: 'R.T.S. Card: Maibatsu Penumbra',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Penumbra</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sanchez2|Maibatsu Sanchez': {
        name: 'R.T.S. Card: Maibatsu Sanchez',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Sanchez</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sanchez|Maibatsu Sanchez (livery)': {
        name: 'R.T.S. Card: Maibatsu Sanchez (livery)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Sanchez (livery)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vincent|Maibatsu Vincent': {
        name: 'R.T.S. Card: Maibatsu Vincent',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maibatsu Vincent</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|patriot|Mammoth Patriot': {
        name: 'R.T.S. Card: Mammoth Patriot',
        vrpName: 'R.T.S. Card: <span style="color:orange">Mammoth Patriot</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|patriot3|Mammoth Patriot Mil-Spec': {
        name: 'R.T.S. Card: Mammoth Patriot Mil-Spec',
        vrpName: 'R.T.S. Card: <span style="color:orange">Mammoth Patriot Mil-Spec</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|patriot2|Mammoth Patriot Stretch': {
        name: 'R.T.S. Card: Mammoth Patriot Stretch',
        vrpName: 'R.T.S. Card: <span style="color:orange">Mammoth Patriot Stretch</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|thruster|Mammoth Thruster Jetpack': {
        name: 'R.T.S. Card: Mammoth Thruster Jetpack',
        vrpName: 'R.T.S. Card: <span style="color:orange">Mammoth Thruster Jetpack</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|asbo|Maxwell Asbo': {
        name: 'R.T.S. Card: Maxwell Asbo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maxwell Asbo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vagrant|Maxwell Vagrant': {
        name: 'R.T.S. Card: Maxwell Vagrant',
        vrpName: 'R.T.S. Card: <span style="color:orange">Maxwell Vagrant</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|typhoon|Modena Typhoon': {
        name: 'R.T.S. Card: Modena Typhoon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Modena Typhoon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bf400|Nagasaki BF400': {
        name: 'R.T.S. Card: Nagasaki BF400',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki BF400</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blazer|Nagasaki Blazer': {
        name: 'R.T.S. Card: Nagasaki Blazer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Blazer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blazer5|Nagasaki Blazer': {
        name: 'R.T.S. Card: Nagasaki Blazer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Blazer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blazer2|Nagasaki Blazer Lifeguard': {
        name: 'R.T.S. Card: Nagasaki Blazer Lifeguard',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Blazer Lifeguard</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|carbonrs|Nagasaki Carbon RS': {
        name: 'R.T.S. Card: Nagasaki Carbon RS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Carbon RS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|chimera|Nagasaki Chimera': {
        name: 'R.T.S. Card: Nagasaki Chimera',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Chimera</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blazer3|Nagasaki Hot Rod Blazer': {
        name: 'R.T.S. Card: Nagasaki Hot Rod Blazer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Hot Rod Blazer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|outlaw|Nagasaki Outlaw': {
        name: 'R.T.S. Card: Nagasaki Outlaw',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Outlaw</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|shinobi|Nagasaki Shinobi': {
        name: 'R.T.S. Card: Nagasaki Shinobi',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Shinobi</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|shotaro|Nagasaki Shotaro': {
        name: 'R.T.S. Card: Nagasaki Shotaro',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Shotaro</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|snowmobile|Nagasaki Snowmobile': {
        name: 'R.T.S. Card: Nagasaki Snowmobile',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Snowmobile</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blazer4|Nagasaki Street Blazer': {
        name: 'R.T.S. Card: Nagasaki Street Blazer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nagasaki Street Blazer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gtr|Nissan GTR': {
        name: 'R.T.S. Card: Nissan GTR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Nissan GTR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ninef|Obey 9F': {
        name: 'R.T.S. Card: Obey 9F',
        vrpName: 'R.T.S. Card: <span style="color:orange">Obey 9F</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|draftgpr|Obey Draft GPR': {
        name: 'R.T.S. Card: Obey Draft GPR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Obey Draft GPR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|iwagen|Obey I-Wagen': {
        name: 'R.T.S. Card: Obey I-Wagen',
        vrpName: 'R.T.S. Card: <span style="color:orange">Obey I-Wagen</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|omnis|Obey Omnis': {
        name: 'R.T.S. Card: Obey Omnis',
        vrpName: 'R.T.S. Card: <span style="color:orange">Obey Omnis</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tailgater|Obey Tailgater': {
        name: 'R.T.S. Card: Obey Tailgater',
        vrpName: 'R.T.S. Card: <span style="color:orange">Obey Tailgater</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tailgater2|Obey Tailgater': {
        name: 'R.T.S. Card: Obey Tailgater',
        vrpName: 'R.T.S. Card: <span style="color:orange">Obey Tailgater</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ardent|Ocelot Ardent': {
        name: 'R.T.S. Card: Ocelot Ardent',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Ardent</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|f620|Ocelot F620': {
        name: 'R.T.S. Card: Ocelot F620',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot F620</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jackal|Ocelot Jackal': {
        name: 'R.T.S. Card: Ocelot Jackal',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Jackal</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|jugular|Ocelot Jugular': {
        name: 'R.T.S. Card: Ocelot Jugular',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Jugular</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|locust|Ocelot Locust': {
        name: 'R.T.S. Card: Ocelot Locust',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Locust</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|loretta|Ocelot Loretta': {
        name: 'R.T.S. Card: Ocelot Loretta',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Loretta</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lynx|Ocelot Lynx': {
        name: 'R.T.S. Card: Ocelot Lynx',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Lynx</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pariah|Ocelot Pariah': {
        name: 'R.T.S. Card: Ocelot Pariah',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Pariah</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|penetrator|Ocelot Penetrator': {
        name: 'R.T.S. Card: Ocelot Penetrator',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Penetrator</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|formula2|Ocelot R88': {
        name: 'R.T.S. Card: Ocelot R88',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot R88</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stromberg|Ocelot Stromberg': {
        name: 'R.T.S. Card: Ocelot Stromberg',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Stromberg</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|strombergsu|Ocelot Stromberg Specials Unit': {
        name: 'R.T.S. Card: Ocelot Stromberg Specials Unit',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Stromberg Specials Unit</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|swinger|Ocelot Swinger': {
        name: 'R.T.S. Card: Ocelot Swinger',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot Swinger</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|xa21|Ocelot XA-21': {
        name: 'R.T.S. Card: Ocelot XA-21',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ocelot XA-21</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|odessa|Odessa': {
        name: 'R.T.S. Card: Odessa',
        vrpName: 'R.T.S. Card: <span style="color:orange">Odessa</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|autarch|Overflod Autarch': {
        name: 'R.T.S. Card: Overflod Autarch',
        vrpName: 'R.T.S. Card: <span style="color:orange">Overflod Autarch</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|entityxf|Overflod Entity XF': {
        name: 'R.T.S. Card: Overflod Entity XF',
        vrpName: 'R.T.S. Card: <span style="color:orange">Overflod Entity XF</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|entity2|Overflod Entity XXR': {
        name: 'R.T.S. Card: Overflod Entity XXR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Overflod Entity XXR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|imorgon|Overflod Imorgon': {
        name: 'R.T.S. Card: Overflod Imorgon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Overflod Imorgon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tyrant|Overflod Tyrant': {
        name: 'R.T.S. Card: Overflod Tyrant',
        vrpName: 'R.T.S. Card: <span style="color:orange">Overflod Tyrant</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zeno|Overflod Zeno': {
        name: 'R.T.S. Card: Overflod Zeno',
        vrpName: 'R.T.S. Card: <span style="color:orange">Overflod Zeno</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|marauder|Paramount Marauder': {
        name: 'R.T.S. Card: Paramount Marauder',
        vrpName: 'R.T.S. Card: <span style="color:orange">Paramount Marauder</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bati|Pegassi Bati 801': {
        name: 'R.T.S. Card: Pegassi Bati 801',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Bati 801</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bati2|Pegassi Bati 801RR': {
        name: 'R.T.S. Card: Pegassi Bati 801RR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Bati 801RR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|esskey|Pegassi Esskey': {
        name: 'R.T.S. Card: Pegassi Esskey',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Esskey</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|exoskeleton|Pegassi Exoskeleton': {
        name: 'R.T.S. Card: Pegassi Exoskeleton',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Exoskeleton</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fcr|Pegassi FCR 1000': {
        name: 'R.T.S. Card: Pegassi FCR 1000',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi FCR 1000</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fcr2|Pegassi FCR 1000 Custom': {
        name: 'R.T.S. Card: Pegassi FCR 1000 Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi FCR 1000 Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|faggio2|Pegassi Faggio': {
        name: 'R.T.S. Card: Pegassi Faggio',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Faggio</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|faggio3|Pegassi Faggio Mod': {
        name: 'R.T.S. Card: Pegassi Faggio Mod',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Faggio Mod</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ignus|Pegassi Ignus': {
        name: 'R.T.S. Card: Pegassi Ignus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Ignus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|infernus|Pegassi Infernus': {
        name: 'R.T.S. Card: Pegassi Infernus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Infernus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|infernus2|Pegassi Infernus Classic': {
        name: 'R.T.S. Card: Pegassi Infernus Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Infernus Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|osiris|Pegassi Osiris': {
        name: 'R.T.S. Card: Pegassi Osiris',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Osiris</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|reaper|Pegassi Reaper': {
        name: 'R.T.S. Card: Pegassi Reaper',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Reaper</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ruffian|Pegassi Ruffian': {
        name: 'R.T.S. Card: Pegassi Ruffian',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Ruffian</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tempesta|Pegassi Tempesta': {
        name: 'R.T.S. Card: Pegassi Tempesta',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Tempesta</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tezeract|Pegassi Tezeract': {
        name: 'R.T.S. Card: Pegassi Tezeract',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Tezeract</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|toreador|Pegassi Toreador': {
        name: 'R.T.S. Card: Pegassi Toreador',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Toreador</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|torero|Pegassi Torero': {
        name: 'R.T.S. Card: Pegassi Torero',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Torero</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|toros|Pegassi Toros': {
        name: 'R.T.S. Card: Pegassi Toros',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Toros</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vacca|Pegassi Vacca': {
        name: 'R.T.S. Card: Pegassi Vacca',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Vacca</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zentorno|Pegassi Zentorno': {
        name: 'R.T.S. Card: Pegassi Zentorno',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Zentorno</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zorrusso|Pegassi Zorrusso': {
        name: 'R.T.S. Card: Pegassi Zorrusso',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pegassi Zorrusso</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pfister811|Pfister 811': {
        name: 'R.T.S. Card: Pfister 811',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister 811</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|astron|Pfister Astron': {
        name: 'R.T.S. Card: Pfister Astron',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Astron</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|comet2|Pfister Comet': {
        name: 'R.T.S. Card: Pfister Comet',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Comet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|comet3|Pfister Comet Retro Custom': {
        name: 'R.T.S. Card: Pfister Comet Retro Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Comet Retro Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|comet6|Pfister Comet S2': {
        name: 'R.T.S. Card: Pfister Comet S2',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Comet S2</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|comet7|Pfister Comet S2 Cabrio': {
        name: 'R.T.S. Card: Pfister Comet S2 Cabrio',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Comet S2 Cabrio</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|comet5|Pfister Comet SR': {
        name: 'R.T.S. Card: Pfister Comet SR',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Comet SR</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|comet4|Pfister Comet Safari': {
        name: 'R.T.S. Card: Pfister Comet Safari',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Comet Safari</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|growler|Pfister Growler': {
        name: 'R.T.S. Card: Pfister Growler',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Growler</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|neon|Pfister Neon': {
        name: 'R.T.S. Card: Pfister Neon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Pfister Neon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deveste|Principe Deveste Eight': {
        name: 'R.T.S. Card: Principe Deveste Eight',
        vrpName: 'R.T.S. Card: <span style="color:orange">Principe Deveste Eight</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|diablous|Principe Diabolus': {
        name: 'R.T.S. Card: Principe Diabolus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Principe Diabolus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|diablous2|Principe Diabolus Custom': {
        name: 'R.T.S. Card: Principe Diabolus Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Principe Diabolus Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|lectro|Principe Lectro': {
        name: 'R.T.S. Card: Principe Lectro',
        vrpName: 'R.T.S. Card: <span style="color:orange">Principe Lectro</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|emerus|Progen Emerus': {
        name: 'R.T.S. Card: Progen Emerus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen Emerus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gp1|Progen GP1': {
        name: 'R.T.S. Card: Progen GP1',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen GP1</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|italigtb|Progen Itali GTB': {
        name: 'R.T.S. Card: Progen Itali GTB',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen Itali GTB</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|italigtb2|Progen Itali GTB Custom': {
        name: 'R.T.S. Card: Progen Itali GTB Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen Itali GTB Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|formula|Progen PR4': {
        name: 'R.T.S. Card: Progen PR4',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen PR4</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|t20|Progen T20': {
        name: 'R.T.S. Card: Progen T20',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen T20</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tyrus|Progen Tyrus': {
        name: 'R.T.S. Card: Progen Tyrus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Progen Tyrus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rcbandito|RC Bandito': {
        name: 'R.T.S. Card: RC Bandito',
        vrpName: 'R.T.S. Card: <span style="color:orange">RC Bandito</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cheburek|RUNE Cheburek': {
        name: 'R.T.S. Card: RUNE Cheburek',
        vrpName: 'R.T.S. Card: <span style="color:orange">RUNE Cheburek</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zhaba|RUNE Zhaba': {
        name: 'R.T.S. Card: RUNE Zhaba',
        vrpName: 'R.T.S. Card: <span style="color:orange">RUNE Zhaba</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dune4|Ramp Buggy': {
        name: 'R.T.S. Card: Ramp Buggy',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ramp Buggy</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dan3|Red Bull Racing RB13 (No. 3)': {
        name: 'R.T.S. Card: Red Bull Racing RB13 (No. 3)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Red Bull Racing RB13 (No. 3)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|max33|Red Bull Racing RB13 (No. 33)': {
        name: 'R.T.S. Card: Red Bull Racing RB13 (No. 33)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Red Bull Racing RB13 (No. 33)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|f1|Red Bull Racing RB14': {
        name: 'R.T.S. Card: Red Bull Racing RB14',
        vrpName: 'R.T.S. Card: <span style="color:orange">Red Bull Racing RB14</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rrphantom|Rolls-Royce Phantom': {
        name: 'R.T.S. Card: Rolls-Royce Phantom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Rolls-Royce Phantom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deviant|Schyster Deviant': {
        name: 'R.T.S. Card: Schyster Deviant',
        vrpName: 'R.T.S. Card: <span style="color:orange">Schyster Deviant</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fusilade|Schyster Fusilade': {
        name: 'R.T.S. Card: Schyster Fusilade',
        vrpName: 'R.T.S. Card: <span style="color:orange">Schyster Fusilade</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pmp600|Schyster PMP 600': {
        name: 'R.T.S. Card: Schyster PMP 600',
        vrpName: 'R.T.S. Card: <span style="color:orange">Schyster PMP 600</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|defiler|Shitzu Defiler': {
        name: 'R.T.S. Card: Shitzu Defiler',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu Defiler</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hakuchou|Shitzu Hakuchou': {
        name: 'R.T.S. Card: Shitzu Hakuchou',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu Hakuchou</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hakuchou3|Shitzu Hakuchou Custom': {
        name: 'R.T.S. Card: Shitzu Hakuchou Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu Hakuchou Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hakuchou2|Shitzu Hakuchou Drag': {
        name: 'R.T.S. Card: Shitzu Hakuchou Drag',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu Hakuchou Drag</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nrg900|Shitzu NRG900': {
        name: 'R.T.S. Card: Shitzu NRG900',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu NRG900</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|pcj|Shitzu PCJ 600': {
        name: 'R.T.S. Card: Shitzu PCJ 600',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu PCJ 600</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|vader|Shitzu Vader': {
        name: 'R.T.S. Card: Shitzu Vader',
        vrpName: 'R.T.S. Card: <span style="color:orange">Shitzu Vader</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stiwrc|Subaru Impreza Rally': {
        name: 'R.T.S. Card: Subaru Impreza Rally',
        vrpName: 'R.T.S. Card: <span style="color:orange">Subaru Impreza Rally</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|superkart|Superkart': {
        name: 'R.T.S. Card: Superkart',
        vrpName: 'R.T.S. Card: <span style="color:orange">Superkart</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|tmodel|Tesla Model 3': {
        name: 'R.T.S. Card: Tesla Model 3',
        vrpName: 'R.T.S. Card: <span style="color:orange">Tesla Model 3</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|models|Tesla Model S': {
        name: 'R.T.S. Card: Tesla Model S',
        vrpName: 'R.T.S. Card: <span style="color:orange">Tesla Model S</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ae86|Toyota Sprinter Trueno AE86': {
        name: 'R.T.S. Card: Toyota Sprinter Trueno AE86',
        vrpName: 'R.T.S. Card: <span style="color:orange">Toyota Sprinter Trueno AE86</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|adder|Truffade Adder': {
        name: 'R.T.S. Card: Truffade Adder',
        vrpName: 'R.T.S. Card: <span style="color:orange">Truffade Adder</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nero|Truffade Nero': {
        name: 'R.T.S. Card: Truffade Nero',
        vrpName: 'R.T.S. Card: <span style="color:orange">Truffade Nero</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nero2|Truffade Nero Custom': {
        name: 'R.T.S. Card: Truffade Nero Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Truffade Nero Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|thrax|Truffade Thrax': {
        name: 'R.T.S. Card: Truffade Thrax',
        vrpName: 'R.T.S. Card: <span style="color:orange">Truffade Thrax</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ztype|Truffade Z-Type': {
        name: 'R.T.S. Card: Truffade Z-Type',
        vrpName: 'R.T.S. Card: <span style="color:orange">Truffade Z-Type</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|oracle2|Ubermacht Oracle': {
        name: 'R.T.S. Card: Ubermacht Oracle',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Oracle</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|revolter|Ubermacht Revolter': {
        name: 'R.T.S. Card: Ubermacht Revolter',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Revolter</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sc1|Ubermacht SC1': {
        name: 'R.T.S. Card: Ubermacht SC1',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht SC1</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sentinel2|Ubermacht Sentinel': {
        name: 'R.T.S. Card: Ubermacht Sentinel',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Sentinel</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sentinel3|Ubermacht Sentinel Classic': {
        name: 'R.T.S. Card: Ubermacht Sentinel Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Sentinel Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sentinelr|Ubermacht Sentinel Race': {
        name: 'R.T.S. Card: Ubermacht Sentinel Race',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Sentinel Race</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sentinel|Ubermacht Sentinel XS': {
        name: 'R.T.S. Card: Ubermacht Sentinel XS',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Sentinel XS</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zion2|Ubermacht Zion Cabrio': {
        name: 'R.T.S. Card: Ubermacht Zion Cabrio',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Zion Cabrio</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|zion3|Ubermacht Zion Classic': {
        name: 'R.T.S. Card: Ubermacht Zion Classic',
        vrpName: 'R.T.S. Card: <span style="color:orange">Ubermacht Zion Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|caracara|Vapid  Caracara': {
        name: 'R.T.S. Card: Vapid  Caracara',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid  Caracara</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|blade|Vapid Blade': {
        name: 'R.T.S. Card: Vapid Blade',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Blade</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bobcat|Vapid Bobcat': {
        name: 'R.T.S. Card: Vapid Bobcat',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Bobcat</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bobcatxl|Vapid Bobcat XL': {
        name: 'R.T.S. Card: Vapid Bobcat XL',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Bobcat XL</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bullet|Vapid Bullet': {
        name: 'R.T.S. Card: Vapid Bullet',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Bullet</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|caracara2|Vapid Caracara 4x4': {
        name: 'R.T.S. Card: Vapid Caracara 4x4',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Caracara 4x4</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|chino|Vapid Chino': {
        name: 'R.T.S. Card: Vapid Chino',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Chino</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|chino2|Vapid Chino Custom': {
        name: 'R.T.S. Card: Vapid Chino Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Chino Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|clique|Vapid Clique': {
        name: 'R.T.S. Card: Vapid Clique',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Clique</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|contender|Vapid Contender': {
        name: 'R.T.S. Card: Vapid Contender',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Contender</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|contender2|Vapid Contender E109': {
        name: 'R.T.S. Card: Vapid Contender E109',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Contender E109</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|trophytruck2|Vapid Desert Raid': {
        name: 'R.T.S. Card: Vapid Desert Raid',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Desert Raid</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator|Vapid Dominator': {
        name: 'R.T.S. Card: Vapid Dominator',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator7|Vapid Dominator ASP': {
        name: 'R.T.S. Card: Vapid Dominator ASP',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator ASP</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator4|Vapid Dominator Apocalypse': {
        name: 'R.T.S. Card: Vapid Dominator Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator5|Vapid Dominator Future Shock': {
        name: 'R.T.S. Card: Vapid Dominator Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator8|Vapid Dominator GTT': {
        name: 'R.T.S. Card: Vapid Dominator GTT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator GTT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator3|Vapid Dominator GTX': {
        name: 'R.T.S. Card: Vapid Dominator GTX',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator GTX</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator6|Vapid Dominator Nightmare': {
        name: 'R.T.S. Card: Vapid Dominator Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dominator Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dragking|Vapid Dragking': {
        name: 'R.T.S. Card: Vapid Dragking',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Dragking</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ellie|Vapid Ellie': {
        name: 'R.T.S. Card: Vapid Ellie',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Ellie</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fmj|Vapid FMJ': {
        name: 'R.T.S. Card: Vapid FMJ',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid FMJ</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|flashgt|Vapid Flash GT': {
        name: 'R.T.S. Card: Vapid Flash GT',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Flash GT</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|18f350plow|Vapid Ford F350': {
        name: 'R.T.S. Card: Vapid Ford F350',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Ford F350</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fortune|Vapid Fortune': {
        name: 'R.T.S. Card: Vapid Fortune',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Fortune</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gb200|Vapid GB200': {
        name: 'R.T.S. Card: Vapid GB200',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid GB200</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|guardian|Vapid Guardian': {
        name: 'R.T.S. Card: Vapid Guardian',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Guardian</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|imperator|Vapid Imperator Apocalypse': {
        name: 'R.T.S. Card: Vapid Imperator Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Imperator Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|imperator2|Vapid Imperator Future Shock': {
        name: 'R.T.S. Card: Vapid Imperator Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Imperator Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|imperator3|Vapid Imperator Nightmare': {
        name: 'R.T.S. Card: Vapid Imperator Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Imperator Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|interceptor|Vapid Interceptor': {
        name: 'R.T.S. Card: Vapid Interceptor',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Interceptor</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|kentish|Vapid Kentish': {
        name: 'R.T.S. Card: Vapid Kentish',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Kentish</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|monster|Vapid Liberator': {
        name: 'R.T.S. Card: Vapid Liberator',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Liberator</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|slamvan2|Vapid Lost Slamvan': {
        name: 'R.T.S. Card: Vapid Lost Slamvan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Lost Slamvan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|minivan|Vapid Minivan': {
        name: 'R.T.S. Card: Vapid Minivan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Minivan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|minivan2|Vapid Minivan Custom': {
        name: 'R.T.S. Card: Vapid Minivan Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Minivan Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dominator2|Vapid Pisswasser Dominator': {
        name: 'R.T.S. Card: Vapid Pisswasser Dominator',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Pisswasser Dominator</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|retinue|Vapid Retinue': {
        name: 'R.T.S. Card: Vapid Retinue',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Retinue</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|retinue2|Vapid Retinue Mk II': {
        name: 'R.T.S. Card: Vapid Retinue Mk II',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Retinue Mk II</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|riata|Vapid Riata': {
        name: 'R.T.S. Card: Vapid Riata',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Riata</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sandking|Vapid Sandking XL': {
        name: 'R.T.S. Card: Vapid Sandking XL',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Sandking XL</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|slamvan|Vapid Slamvan': {
        name: 'R.T.S. Card: Vapid Slamvan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Slamvan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|slamvan3|Vapid Slamvan Custom': {
        name: 'R.T.S. Card: Vapid Slamvan Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Slamvan Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|slamvan5|Vapid Slamvan Future Shock': {
        name: 'R.T.S. Card: Vapid Slamvan Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Slamvan Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|speedo|Vapid Speedo': {
        name: 'R.T.S. Card: Vapid Speedo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Speedo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|taxi|Vapid Taxi (Stanier)': {
        name: 'R.T.S. Card: Vapid Taxi (Stanier)',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Taxi (Stanier)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|trophytruck|Vapid Trophy Truck': {
        name: 'R.T.S. Card: Vapid Trophy Truck',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Trophy Truck</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|uranus|Vapid Uranus': {
        name: 'R.T.S. Card: Vapid Uranus',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Uranus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|winky|Vapid Winky': {
        name: 'R.T.S. Card: Vapid Winky',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vapid Winky</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|fagaloa|Vulcar Fagaloa': {
        name: 'R.T.S. Card: Vulcar Fagaloa',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vulcar Fagaloa</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ingot|Vulcar Ingot': {
        name: 'R.T.S. Card: Vulcar Ingot',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vulcar Ingot</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|warrener2|Vulcar Warrener Pickup': {
        name: 'R.T.S. Card: Vulcar Warrener Pickup',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vulcar Warrener Pickup</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|neo|Vysser Neo': {
        name: 'R.T.S. Card: Vysser Neo',
        vrpName: 'R.T.S. Card: <span style="color:orange">Vysser Neo</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|dynasty|Weeny Dynasty': {
        name: 'R.T.S. Card: Weeny Dynasty',
        vrpName: 'R.T.S. Card: <span style="color:orange">Weeny Dynasty</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|issi2|Weeny Issi': {
        name: 'R.T.S. Card: Weeny Issi',
        vrpName: 'R.T.S. Card: <span style="color:orange">Weeny Issi</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|issi4|Weeny Issi Apocalypse': {
        name: 'R.T.S. Card: Weeny Issi Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Weeny Issi Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|issi5|Weeny Issi Future Shock': {
        name: 'R.T.S. Card: Weeny Issi Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Weeny Issi Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|issi6|Weeny Issi Nightmare': {
        name: 'R.T.S. Card: Weeny Issi Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Weeny Issi Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|issi7|Weeny Issi Sport': {
        name: 'R.T.S. Card: Weeny Issi Sport',
        vrpName: 'R.T.S. Card: <span style="color:orange">Weeny Issi Sport</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|angel|Western Angel': {
        name: 'R.T.S. Card: Western Angel',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Angel</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|bagger|Western Bagger': {
        name: 'R.T.S. Card: Western Bagger',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Bagger</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|daemon|Western Daemon': {
        name: 'R.T.S. Card: Western Daemon',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Daemon</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deathbike|Western Deathbike Apocalypse': {
        name: 'R.T.S. Card: Western Deathbike Apocalypse',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Deathbike Apocalypse</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deathbike2|Western Deathbike Future Shock': {
        name: 'R.T.S. Card: Western Deathbike Future Shock',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Deathbike Future Shock</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|deathbike3|Western Deathbike Nightmare': {
        name: 'R.T.S. Card: Western Deathbike Nightmare',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Deathbike Nightmare</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|freeway|Western Freeway': {
        name: 'R.T.S. Card: Western Freeway',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Freeway</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|gargoyle|Western Gargoyle': {
        name: 'R.T.S. Card: Western Gargoyle',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Gargoyle</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|hellfury|Western Hellfury': {
        name: 'R.T.S. Card: Western Hellfury',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Hellfury</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sovereign2|Western Motorcycle Company Sovereign': {
        name: 'R.T.S. Card: Western Motorcycle Company Sovereign',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Motorcycle Company Sovereign</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|nightblade|Western Nightblade': {
        name: 'R.T.S. Card: Western Nightblade',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Nightblade</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|rrocket|Western Rampant Rocket': {
        name: 'R.T.S. Card: Western Rampant Rocket',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Rampant Rocket</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|ratbike|Western Rat Bike': {
        name: 'R.T.S. Card: Western Rat Bike',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Rat Bike</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|reever|Western Reever': {
        name: 'R.T.S. Card: Western Reever',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Reever</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|sovereign|Western Sovereign': {
        name: 'R.T.S. Card: Western Sovereign',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Sovereign</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|wolfsbane|Western Wolfsbane': {
        name: 'R.T.S. Card: Western Wolfsbane',
        vrpName: 'R.T.S. Card: <span style="color:orange">Western Wolfsbane</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|faction2|Willard Faction Custom': {
        name: 'R.T.S. Card: Willard Faction Custom',
        vrpName: 'R.T.S. Card: <span style="color:orange">Willard Faction Custom</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|faction3|Willard Faction Custom Donk': {
        name: 'R.T.S. Card: Willard Faction Custom Donk',
        vrpName: 'R.T.S. Card: <span style="color:orange">Willard Faction Custom Donk</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|marbelle|Willard Marbelle': {
        name: 'R.T.S. Card: Willard Marbelle',
        vrpName: 'R.T.S. Card: <span style="color:orange">Willard Marbelle</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|willard|Willard Willard': {
        name: 'R.T.S. Card: Willard Willard',
        vrpName: 'R.T.S. Card: <span style="color:orange">Willard Willard</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|journeys|Zirconium Journey Tourer': {
        name: 'R.T.S. Card: Zirconium Journey Tourer',
        vrpName: 'R.T.S. Card: <span style="color:orange">Zirconium Journey Tourer</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stratum|Zirconium Stratum': {
        name: 'R.T.S. Card: Zirconium Stratum',
        vrpName: 'R.T.S. Card: <span style="color:orange">Zirconium Stratum</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|stratum2|Zirconium Stratum Sedan': {
        name: 'R.T.S. Card: Zirconium Stratum Sedan',
        vrpName: 'R.T.S. Card: <span style="color:orange">Zirconium Stratum Sedan</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rts_card|cypher|Übermacht Cypher': {
        name: 'R.T.S. Card: Übermacht Cypher',
        vrpName: 'R.T.S. Card: <span style="color:orange">Übermacht Cypher</span>',
        weight: 0,
        isTruckingItem: false
    },
    'rebreather': {
        name: 'Rebreather ',
        vrpName: 'Rebreather ',
        weight: 0,
        isTruckingItem: false
    },
    'repairkit': {
        name: 'Repair Kit',
        vrpName: 'Repair Kit',
        weight: 0,
        isTruckingItem: false
    },
    'rotten_potato': {
        name: 'Rotten Potato',
        vrpName: '<span></span>Rotten Potato',
        weight: 0,
        isTruckingItem: false
    },
    'tackle_box_rusty': {
        name: 'Rusty Tackle Box',
        vrpName: 'Rusty Tackle Box',
        weight: 2,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.shipment.tenf': {
        name: 'SD Card: 10F Blueprints',
        vrpName: 'SD Card: <span style="color:tomato">10F Blueprints</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.asphalt': {
        name: 'SD Card: Asphalt Concrete Refining',
        vrpName: 'SD Card: <span style="color:tomato">Asphalt Concrete Refining</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.cardboard': {
        name: 'SD Card: Cardboard Manufacturing',
        vrpName: 'SD Card: <span style="color:tomato">Cardboard Manufacturing</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.sawmill.plank': {
        name: 'SD Card: Chipboard Planks',
        vrpName: 'SD Card: <span style="color:tomato">Chipboard Planks</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.conveyor': {
        name: 'SD Card: Conveyor Rental',
        vrpName: 'SD Card: <span style="color:tomato">Conveyor Rental</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.foundry.copper': {
        name: 'SD Card: Copper Alloy',
        vrpName: 'SD Card: <span style="color:tomato">Copper Alloy</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.clucking.fish': {
        name: 'SD Card: Crispy Fish',
        vrpName: 'SD Card: <span style="color:tomato">Crispy Fish</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.clucking.meat': {
        name: 'SD Card: Crispy Meat',
        vrpName: 'SD Card: <span style="color:tomato">Crispy Meat</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.dilutedfuel': {
        name: 'SD Card: Diluted Fuel Refining',
        vrpName: 'SD Card: <span style="color:tomato">Diluted Fuel Refining</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.quarry.gravel': {
        name: 'SD Card: Gravel Pulverizing',
        vrpName: 'SD Card: <span style="color:tomato">Gravel Pulverizing</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.shipment.landstalker2': {
        name: 'SD Card: Landstalker XL Blueprints',
        vrpName: 'SD Card: <span style="color:tomato">Landstalker XL Blueprints</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.quarry.ore': {
        name: 'SD Card: Ore Mix Recycling',
        vrpName: 'SD Card: <span style="color:tomato">Ore Mix Recycling</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.mckenzie.plastic': {
        name: 'SD Card: Plastic Export Contact',
        vrpName: 'SD Card: <span style="color:tomato">Plastic Export Contact</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.sawmill.sawdust': {
        name: 'SD Card: Sawdust Filler Exploit',
        vrpName: 'SD Card: <span style="color:tomato">Sawdust Filler Exploit</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.foundry.gold': {
        name: 'SD Card: Substitute Gold',
        vrpName: 'SD Card: <span style="color:tomato">Substitute Gold</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.factory.jewelry': {
        name: 'SD Card: Titanium Jewelry',
        vrpName: 'SD Card: <span style="color:tomato">Titanium Jewelry</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.factory.titanium': {
        name: 'SD Card: Titanium Reinforcement',
        vrpName: 'SD Card: <span style="color:tomato">Titanium Reinforcement</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.treatment.waste': {
        name: 'SD Card: Waste Water Cleaning',
        vrpName: 'SD Card: <span style="color:tomato">Waste Water Cleaning</span>',
        weight: 0,
        isTruckingItem: false
    },
    'sd_decrypted|trucking.foundry.zinc': {
        name: 'SD Card: Zinc Alloy',
        vrpName: 'SD Card: <span style="color:tomato">Zinc Alloy</span>',
        weight: 0,
        isTruckingItem: false
    },
    'mining_credit': {
        name: 'Sandstone',
        vrpName: 'Sandstone',
        weight: 5,
        isTruckingItem: false
    },
    'sandwich': {
        name: 'Sandwich',
        vrpName: 'Sandwich',
        weight: 0,
        isTruckingItem: false
    },
    'sponge': {
        name: 'Scrubbing Kit',
        vrpName: 'Scrubbing Kit',
        weight: 0,
        isTruckingItem: false
    },
    'shipping_crate|mk15|Chernobog Toter': {
        name: 'Shipping Container: Chernobog Toter',
        vrpName: 'Shipping Container: <span style="color:orange">Chernobog Toter</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|savanna|Coil Savanna': {
        name: 'Shipping Container: Coil Savanna',
        vrpName: 'Shipping Container: <span style="color:orange">Coil Savanna</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|exoskeleton|Exoskeleton': {
        name: 'Shipping Container: Exoskeleton',
        vrpName: 'Shipping Container: <span style="color:orange">Exoskeleton</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|hotknife|Hotknife': {
        name: 'Shipping Container: Hotknife',
        vrpName: 'Shipping Container: <span style="color:orange">Hotknife</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|kuruma|Kuruma': {
        name: 'Shipping Container: Kuruma',
        vrpName: 'Shipping Container: <span style="color:orange">Kuruma</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|trailerswb2|MK10 (Refridgerated Trailer)': {
        name: 'Shipping Container: MK10 (Refridgerated Trailer)',
        vrpName: 'Shipping Container: <span style="color:orange">MK10 (Refridgerated Trailer)</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|supervolito2|Passenger SuperVolito Carbon': {
        name: 'Shipping Container: Passenger SuperVolito Carbon',
        vrpName: 'Shipping Container: <span style="color:orange">Passenger SuperVolito Carbon</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|postopp3|PostOP P3': {
        name: 'Shipping Container: PostOP P3',
        vrpName: 'Shipping Container: <span style="color:orange">PostOP P3</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|ruffian|Ruffian': {
        name: 'Shipping Container: Ruffian',
        vrpName: 'Shipping Container: <span style="color:orange">Ruffian</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|dune2|Space Docker': {
        name: 'Shipping Container: Space Docker',
        vrpName: 'Shipping Container: <span style="color:orange">Space Docker</span>',
        weight: 100,
        isTruckingItem: false
    },
    'shipping_crate|wastelander|Wastelander': {
        name: 'Shipping Container: Wastelander',
        vrpName: 'Shipping Container: <span style="color:orange">Wastelander</span>',
        weight: 100,
        isTruckingItem: false
    },
    'level_token': {
        name: 'Skill Level Token',
        vrpName: 'Skill Level Token',
        weight: 0,
        isTruckingItem: false
    },
    'xmplow_token24': {
        name: 'Snowplowing Token',
        vrpName: '<span style="color:aquamarine">Snowplowing Token</span>',
        weight: 0,
        isTruckingItem: false
    },
    'spaceship_part': {
        name: 'Spaceship Part',
        vrpName: 'Spaceship Part',
        weight: 1,
        isTruckingItem: false
    },
    'trap_card': {
        name: 'Speed Trap Card',
        vrpName: 'Speed Trap Card',
        weight: 0,
        isTruckingItem: false
    },
    'speed_trap_radar': {
        name: 'Speed Trap Radar',
        vrpName: '<span style="color:gold">Speed Trap Radar</span>',
        weight: 5,
        isTruckingItem: false
    },
    'spook_stick': {
        name: 'Spook Stick',
        vrpName: 'Spook Stick',
        weight: 0,
        isTruckingItem: false
    },
    'sprunk': {
        name: 'Sprunk',
        vrpName: 'Sprunk',
        weight: 0,
        isTruckingItem: false
    },
    'spyglass': {
        name: 'Spyglass',
        vrpName: 'Spyglass',
        weight: 1,
        isTruckingItem: false
    },
    'staff_voucher': {
        name: 'Stink Voucher',
        vrpName: 'Stink Voucher',
        weight: 0,
        isTruckingItem: false
    },
    'storage_card': {
        name: 'Storage Card',
        vrpName: 'Storage Card',
        weight: 0,
        isTruckingItem: false
    },
    'tackle_box': {
        name: 'Tackle Box',
        vrpName: 'Tackle Box',
        weight: 2,
        isTruckingItem: false
    },
    'tacos': {
        name: 'Tacos',
        vrpName: 'Tacos',
        weight: 0,
        isTruckingItem: false
    },
    'tea': {
        name: 'Tea',
        vrpName: 'Tea',
        weight: 0,
        isTruckingItem: false
    },
    'toll_card': {
        name: 'Toll Card',
        vrpName: 'Toll Card',
        weight: 0,
        isTruckingItem: false
    },
    'trash': {
        name: 'Trash',
        vrpName: 'Trash',
        weight: 0.1,
        isTruckingItem: false
    },
    'chest_daily': {
        name: 'Treasure Chest [Daily]',
        vrpName: 'Treasure Chest [Daily]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_none': {
        name: 'Treasure Chest [Empty]',
        vrpName: 'Treasure Chest [Empty]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_tier3': {
        name: 'Treasure Chest [High-grade]',
        vrpName: 'Treasure Chest [High-grade]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_tier1': {
        name: 'Treasure Chest [Low-grade]',
        vrpName: 'Treasure Chest [Low-grade]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_tier2': {
        name: 'Treasure Chest [Medium-grade]',
        vrpName: 'Treasure Chest [Medium-grade]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_tier4': {
        name: 'Treasure Chest [Ultra-grade]',
        vrpName: 'Treasure Chest [Ultra-grade]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_upgradekit': {
        name: 'Treasure Chest [Upgrade Kit]',
        vrpName: 'Treasure Chest [Upgrade Kit]',
        weight: 0,
        isTruckingItem: false
    },
    'chest_key': {
        name: 'Treasure Key',
        vrpName: 'Treasure Key',
        weight: 0,
        isTruckingItem: false
    },
    'chest_key_master': {
        name: 'Treasure Master Key',
        vrpName: "<span class='rainbow'>Treasure Master Key</span>",
        weight: 0,
        isTruckingItem: false
    },
    'trucker_pda': {
        name: 'Truckers PDA',
        vrpName: '<span></span>Trucker&#39;s PDA',
        weight: 0,
        isTruckingItem: false
    },
    'upgrade_kit_tenf2': {
        name: 'Upgrade Kit (10F)',
        vrpName: 'Upgrade Kit (10F)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_deluxo': {
        name: 'Upgrade Kit (Deluxo GT)',
        vrpName: 'Upgrade Kit (Deluxo GT)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_futota': {
        name: 'Upgrade Kit (Futo GT Hatch)',
        vrpName: 'Upgrade Kit (Futo GT Hatch)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_futo2': {
        name: 'Upgrade Kit (Futo)',
        vrpName: 'Upgrade Kit (Futo)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_blistata': {
        name: 'Upgrade Kit (Go Go Monkey Blista)',
        vrpName: 'Upgrade Kit (Go Go Monkey Blista)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_rrocket': {
        name: 'Upgrade Kit (Hotknife)',
        vrpName: 'Upgrade Kit (Hotknife)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_jesterv12': {
        name: 'Upgrade Kit (Jester Classic)',
        vrpName: 'Upgrade Kit (Jester Classic)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_jester2': {
        name: 'Upgrade Kit (Jester)',
        vrpName: 'Upgrade Kit (Jester)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_kurumata2': {
        name: 'Upgrade Kit (Kuruma T/A)',
        vrpName: 'Upgrade Kit (Kuruma T/A)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_kurumata': {
        name: 'Upgrade Kit (Kuruma)',
        vrpName: 'Upgrade Kit (Kuruma)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_primov12': {
        name: 'Upgrade Kit (Primo Custom)',
        vrpName: 'Upgrade Kit (Primo Custom)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_primo2': {
        name: 'Upgrade Kit (Primo)',
        vrpName: 'Upgrade Kit (Primo)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_hpr1': {
        name: 'Upgrade Kit (RE-7B)',
        vrpName: 'Upgrade Kit (RE-7B)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_dragking': {
        name: 'Upgrade Kit (Rampant Rocket)',
        vrpName: 'Upgrade Kit (Rampant Rocket)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_oppressor': {
        name: 'Upgrade Kit (Ruffian)',
        vrpName: 'Upgrade Kit (Ruffian)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_spritzer': {
        name: 'Upgrade Kit (Schafter V12)',
        vrpName: 'Upgrade Kit (Schafter V12)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_spritzerdtm': {
        name: 'Upgrade Kit (Spritzer STR)',
        vrpName: 'Upgrade Kit (Spritzer STR)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_strombergsu': {
        name: 'Upgrade Kit (Stromberg)',
        vrpName: 'Upgrade Kit (Stromberg)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_sultanrs': {
        name: 'Upgrade Kit (Sultan R)',
        vrpName: 'Upgrade Kit (Sultan R)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_sultanr': {
        name: 'Upgrade Kit (Sultan)',
        vrpName: 'Upgrade Kit (Sultan)',
        weight: 20,
        isTruckingItem: false
    },
    'upgrade_kit_voltic2': {
        name: 'Upgrade Kit (Voltic)',
        vrpName: 'Upgrade Kit (Voltic)',
        weight: 20,
        isTruckingItem: false
    },
    'vehicle_card|mk15|Chernobog Toter (MK15)': {
        name: 'Vehicle Card: Chernobog Toter (MK15)',
        vrpName: 'Vehicle Card: <span style="color:orange">Chernobog Toter (MK15)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|verus|Dinka Verus': {
        name: 'Vehicle Card: Dinka Verus',
        vrpName: 'Vehicle Card: <span style="color:orange">Dinka Verus</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|veto|Dinka Veto Classic': {
        name: 'Vehicle Card: Dinka Veto Classic',
        vrpName: 'Vehicle Card: <span style="color:orange">Dinka Veto Classic</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|veto2|Dinka Veto Modern': {
        name: 'Vehicle Card: Dinka Veto Modern',
        vrpName: 'Vehicle Card: <span style="color:orange">Dinka Veto Modern</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|brioso2|Grotti Brioso 300': {
        name: 'Vehicle Card: Grotti Brioso 300',
        vrpName: 'Vehicle Card: <span style="color:orange">Grotti Brioso 300</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|avisa|Kraken Avisa (Submersible)': {
        name: 'Vehicle Card: Kraken Avisa (Submersible)',
        vrpName: 'Vehicle Card: <span style="color:orange">Kraken Avisa (Submersible)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|squaddie|Mammoth Squaddie': {
        name: 'Vehicle Card: Mammoth Squaddie',
        vrpName: 'Vehicle Card: <span style="color:orange">Mammoth Squaddie</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|manchez2|Manchez Scout': {
        name: 'Vehicle Card: Manchez Scout',
        vrpName: 'Vehicle Card: <span style="color:orange">Manchez Scout</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|toreador|Pegassi Toreador': {
        name: 'Vehicle Card: Pegassi Toreador',
        vrpName: 'Vehicle Card: <span style="color:orange">Pegassi Toreador</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|kosatka|RUNE Kosatka (Submarine)': {
        name: 'Vehicle Card: RUNE Kosatka (Submarine)',
        vrpName: 'Vehicle Card: <span style="color:orange">RUNE Kosatka (Submarine)</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|polaleutian|Toms Aleutian': {
        name: 'Vehicle Card: Toms Aleutian',
        vrpName: 'Vehicle Card: <span style="color:orange">Toms Aleutian</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|winky|Vapid Winky': {
        name: 'Vehicle Card: Vapid Winky',
        vrpName: 'Vehicle Card: <span style="color:orange">Vapid Winky</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_card|vetir|Vetir': {
        name: 'Vehicle Card: Vetir',
        vrpName: 'Vehicle Card: <span style="color:orange">Vetir</span>',
        weight: 0,
        isTruckingItem: false
    },
    'vehicle_shipment|tenf|10F|car': {
        name: 'Vehicle Shipment: 10F',
        vrpName: 'Vehicle Shipment: <span style="color:orange">10F</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|savanna|Coil Savanna|car': {
        name: 'Vehicle Shipment: Coil Savanna',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Coil Savanna</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|btype2|Franken Stange': {
        name: 'Vehicle Shipment: Franken Stange',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Franken Stange</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|dilettantedx|Karin Dilettante DX|car': {
        name: 'Vehicle Shipment: Karin Dilettante DX',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Karin Dilettante DX</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|futo|Karin Futo|car': {
        name: 'Vehicle Shipment: Karin Futo',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Karin Futo</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|nightshark|HVY Nightshark|car': {
        name: 'Vehicle Shipment: HVY Nightshark',
        vrpName: 'Vehicle Shipment: <span style="color:orange">HVY Nightshark</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|snowplow|Snow Plow': {
        name: 'Vehicle Shipment: Snow Plow',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Snow Plow</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|zr350|ZR-350|car': {
        name: 'Vehicle Shipment: ZR-350',
        vrpName: 'Vehicle Shipment: <span style="color:orange">ZR-350</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|vertice|Hijak Vertice|car': {
        name: 'Vehicle Shipment: Hijak Vertice',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Hijak Vertice</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vehicle_shipment|landstalker2|Landstalker XL|car': {
        name: 'Vehicle Shipment: Landstalker XL',
        vrpName: 'Vehicle Shipment: <span style="color:orange">Landstalker XL</span>',
        weight: 100,
        isTruckingItem: false
    },
    'vodka': {
        name: 'Vodka',
        vrpName: 'Vodka',
        weight: 0,
        isTruckingItem: false
    },
    'water': {
        name: 'Water Bottle',
        vrpName: 'Water Bottle',
        weight: 0,
        isTruckingItem: false
    },
    'weather_stick': {
        name: 'Weather Stick',
        vrpName: 'Weather Stick',
        weight: 0,
        isTruckingItem: false
    },
    'zombie_meat': {
        name: 'Zombie Meat',
        vrpName: 'Zombie Meat',
        weight: 0,
        isTruckingItem: false
    },
    'gut_knife_st': {
        name: '☆ StatTrak™ Gut Knife',
        vrpName: "<span n='0'/>☆ StatTrak™ Gut Knife",
        weight: 15,
        isTruckingItem: false
    },
    'gut_knife_fade': {
        name: '☆ StatTrak™ Gut Knife | Autotronic',
        vrpName: "<span style='color:darkOrange' n='189'>☆ StatTrak™ Gut Knife | Autotronic</span>",
        weight: 15,
        isTruckingItem: false
    },
    'gut_knife_auto': {
        name: '☆ StatTrak™ Gut Knife | Grinder',
        vrpName: "<span style='color:crimson' n='58389'>☆ StatTrak™ Gut Knife | Grinder</span>",
        weight: 0,
        isTruckingItem: false
    },
    'gut_knife_tiger': {
        name: '☆ StatTrak™ Gut Knife | Tiger Tooth',
        vrpName: "<span style='color:purple' n='133'>☆ StatTrak™ Gut Knife | Tiger Tooth</span>",
        weight: 10,
        isTruckingItem: false
    },
    'gut_knife_lore': {
        name: '☆ StatTrak™ Gut Knife | Weightless',
        vrpName: "<span style='color:purple' n='396'>☆ StatTrak™ Gut Knife | Weightless</span>",
        weight: 0,
        isTruckingItem: false
    },
    'crafted_jewelry': {
        name: 'Jewelry',
        vrpName: 'Trucking Cargo: Jewelry',
        weight: 5,
        isTruckingItem: true
    },
    'illegal_crate': {
        name: 'Pill crate',
        vrpName: 'Illegal: Pill crate',
        weight: 40,
        isTruckingItem: true
    },
    'illegal_meth': {
        name: 'Methamphetamine',
        vrpName: 'Illegal: Methamphetamine',
        weight: 10,
        isTruckingItem: true
    },
    'petrochem_asphalt': {
        name: 'Asphalt Concrete',
        vrpName: 'Petrochem: Asphalt Concrete',
        weight: 5,
        isTruckingItem: true
    },
    'liberty_military_goods': {
        name: 'Military Goods',
        vrpName: 'Liberty: Military Goods',
        weight: 100,
        isTruckingItem: true
    },
    'worker_token': {
        name: 'Farming: Worker Token',
        vrpName: 'Farming: Worker Token',
        weight: 1,
        isTruckingItem: false
    },
    'farming_coffee': {
        name: 'Farmers coffee',
        vrpName: 'Farmers coffee',
        weight: 1,
        isTruckingItem: false
    },
    'repair_shop': {
        name: 'Repair Shop',
        vrpName: 'Temporary Repair Shop',
        weight: 1,
        isTruckingItem: true
    },
    'fridge_store_delivery': {
        name: 'Fridge: Food Shipment',
        vrpName: 'Fridge: Food Shipment',
        weight: 10,
        isTruckingItem: true
    },
    'house': {
        name: 'House',
        vrpName: 'House',
        weight: 0,
        isTruckingItem: true
    }
} as const;

const _LOCATIONS: DeepOmit<Location, 'recipes.0.location'>[] = [
    {
        name: 'Alamo Sea Fish Importer',
        recipes: [
            {
                name: 'Sell Fish Meat',
                cost: -1000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Fish Meat'],
                highestMultiplier: 1000,
                highestMultiplierPath: ['Sell 10000x Fish Meat']
            },
            {
                name: 'Sell Premium Fish Meat',
                cost: -3000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat_premium'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat_premium'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Premium Fish Meat'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Sell 1000x Premium Fish Meat']
            }
        ],
        color: '#808080'
    },
    {
        name: 'CollinsCo Dealer',
        recipes: [
            {
                name: 'CollinsCo Boat Vouchers',
                cost: -1500000,
                ingredients: [
                    {
                        item: ITEMS['collinsco_boat_voucher'],
                        amount: 100
                    }
                ],
                exportItem: {
                    item: ITEMS['collinsco_boat_voucher'],
                    amount: 100
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['CollinsCo Boat Vouchers x100'],
                highestMultiplier: 10,
                highestMultiplierPath: ['CollinsCo Boat Vouchers x1000']
            },
            {
                name: 'CollinsCo Boat Voucher',
                cost: -150000,
                ingredients: [
                    {
                        item: ITEMS['collinsco_boat_voucher'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['collinsco_boat_voucher'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['CollinsCo Boat Voucher x10'],
                highestMultiplier: 1,
                highestMultiplierPath: ['CollinsCo Boat Voucher x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'House Construction Site',
        recipes: [
            {
                name: 'House Construction',
                cost: -2350000,
                ingredients: [
                    {
                        item: ITEMS['crafted_copperwire'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_rebar'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_concrete'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_planks'],
                        amount: 2
                    },
                    {
                        item: ITEMS['crafted_ceramictiles'],
                        amount: 4
                    },
                    {
                        item: ITEMS['crafted_computer'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['house'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['House Construction'],
                highestMultiplier: 1,
                highestMultiplierPath: ['House Construction']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Hunter: Meat Buyer',
        recipes: [
            {
                name: 'Meat Buyer',
                cost: -250,
                ingredients: [
                    {
                        item: ITEMS['meat'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['meat'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Meat Buyer'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Meat Buyer x100']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Illegal: Defib Kit Charging',
        recipes: [
            {
                name: 'Charge Empty Defib Kit',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['e_defibkit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['defibkit'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Charge Empty Defib Kit'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Charge Empty Defib Kit x2']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Illegal: Humane Labs',
        recipes: [
            {
                name: 'Craft Pills',
                cost: 100000,
                ingredients: [
                    {
                        item: ITEMS['illegal_meth'],
                        amount: 8
                    },
                    {
                        item: ITEMS['illegal_crate'],
                        amount: 3
                    }
                ],
                products: [
                    {
                        item: ITEMS['pills'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Craft Pills'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Craft Pills']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Illegal: Liquor Ace',
        recipes: [
            {
                name: 'Pick up methamphetamine',
                cost: 10000,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['illegal_meth'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up methamphetamine'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Pick up methamphetamine x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Illegal: Plastic Molding',
        recipes: [
            {
                name: 'Craft Empty Defib Kit',
                cost: 10000,
                ingredients: [
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['e_defibkit'],
                        amount: 5
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Craft Empty Defib Kit'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Craft Empty Defib Kit']
            }
        ],
        color: '#808080'
    },
    {
        name: "Illegal: Pop's Pills ",
        recipes: [
            {
                name: 'Pick up pills crate',
                cost: 10000,
                ingredients: [
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 5
                    },
                    {
                        item: ITEMS['refined_planks'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['illegal_crate'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Pick up pills crate'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Pick up pills crate x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Los Santos Fish Importer',
        recipes: [
            {
                name: 'Sell Fish Meat',
                cost: -1000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Fish Meat'],
                highestMultiplier: 1000,
                highestMultiplierPath: ['Sell 10000x Fish Meat']
            },
            {
                name: 'Sell Premium Fish Meat',
                cost: -3000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat_premium'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat_premium'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Premium Fish Meat'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Sell 1000x Premium Fish Meat']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Paleto Cove Fish Importer',
        recipes: [
            {
                name: 'Sell Fish Meat',
                cost: -1000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Fish Meat'],
                highestMultiplier: 1000,
                highestMultiplierPath: ['Sell 10000x Fish Meat']
            },
            {
                name: 'Sell Premium Fish Meat',
                cost: -3000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat_premium'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat_premium'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Premium Fish Meat'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Sell 1000x Premium Fish Meat']
            }
        ],
        color: '#808080'
    },
    {
        name: 'PostOp HQ',
        recipes: [
            {
                name: 'Buy mail',
                cost: 100,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['mail'],
                        amount: 5
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Buy mail x5'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Buy mail x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'San Chianski Airport Fish Importer',
        recipes: [
            {
                name: 'Sell Fish Meat',
                cost: -1000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Fish Meat'],
                highestMultiplier: 1000,
                highestMultiplierPath: ['Sell 10000x Fish Meat']
            },
            {
                name: 'Sell Premium Fish Meat',
                cost: -3000,
                ingredients: [
                    {
                        item: ITEMS['fish_meat_premium'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['fish_meat_premium'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell 10x Premium Fish Meat'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Sell 1000x Premium Fish Meat']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking Cargo Merchant: Erasers',
        recipes: [
            {
                name: 'Buy: Erasers',
                cost: 200,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['tcargosmall'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Buy: Erasers'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Buy: Erasers x100']
            },
            {
                name: 'Sell: Erasers',
                cost: -600,
                ingredients: [
                    {
                        item: ITEMS['tcargosmall'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['tcargosmall'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell: Erasers'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Sell: Erasers x100']
            }
        ],
        color: '#FFF5E1'
    },
    {
        name: 'Trucking Cargo Merchant: Tools',
        recipes: [
            {
                name: 'Buy: Tools',
                cost: 100,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['pucargosmall'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Buy: Tools'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Buy: Tools x100']
            },
            {
                name: 'Sell: Tools',
                cost: -200,
                ingredients: [
                    {
                        item: ITEMS['pucargosmall'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['pucargosmall'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell: Tools'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Sell: Tools x100']
            },
            {
                name: 'Mechanic Hammer',
                cost: 10000,
                ingredients: [
                    {
                        item: ITEMS['tavi_hardened_steel'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_planks'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanic_hammer'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Craft: Mechanic Hammer'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Craft: Mechanic Hammer x10']
            },
            {
                name: 'Mechanic Wrench',
                cost: 10000,
                ingredients: [
                    {
                        item: ITEMS['tavi_hardened_steel'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanic_wrench'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Craft: Mechanic Wrench'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Craft: Mechanic Wrench x10']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Alta Construction Site',
        recipes: [
            {
                name: 'Deliver Asphalt Concrete',
                cost: -25000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_asphalt'],
                        amount: 5
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_asphalt'],
                    amount: 5
                },
                priority: -1,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Asphalt Concrete'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Deliver Asphalt Concrete x5']
            },
            {
                name: 'Deliver Rebar',
                cost: -230000,
                ingredients: [
                    {
                        item: ITEMS['crafted_rebar'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_rebar'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Rebar'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Deliver Rebar x5']
            },
            {
                name: 'Deliver Concrete',
                cost: -800000,
                ingredients: [
                    {
                        item: ITEMS['crafted_concrete'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_concrete'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Concrete'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Deliver Concrete x2']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Bristols Fuel Storage',
        recipes: [
            {
                name: 'Sell Diesel',
                cost: -12000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_diesel'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell Diesel'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Sell Diesel x10']
            },
            {
                name: 'Sell Kerosene',
                cost: -15000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_kerosene'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell Kerosene'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Sell Kerosene x10']
            },
            {
                name: 'Sell Petrol',
                cost: -8000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_petrol'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell Petrol'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Sell Petrol x10']
            },
            {
                name: 'Sell Empty Jerry Cans',
                cost: -4000,
                ingredients: [
                    {
                        item: ITEMS['jerry_can_empty'],
                        amount: 10
                    }
                ],
                exportItem: {
                    item: ITEMS['jerry_can_empty'],
                    amount: 10
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell Empty Jerry Cans'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Sell Empty Jerry Cans']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Chemical Laboratories',
        recipes: [
            {
                name: 'Refine Chemicals',
                cost: 2500,
                ingredients: [
                    {
                        item: ITEMS['military_chemicals'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_acid'],
                        amount: 4
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Refine Chemicals', 'Refine Chemicals'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Chemicals', 'Refine Chemicals x10']
            },
            {
                name: 'Pick up Toxic Waste',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['recycled_waste'],
                        amount: 1
                    }
                ],
                priority: -10,
                type: RecipeType.Import,
                path: ['Pickup Toxic Waste', 'Pick up Toxic Waste'],
                highestMultiplier: 3,
                highestMultiplierPath: ['Pickup Toxic Waste', 'Pick up Toxic Waste x3']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Clucking Bell Farms',
        recipes: [
            {
                name: 'Pack Fish Meat',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['fish_meat'],
                        amount: 150
                    }
                ],
                products: [
                    {
                        item: ITEMS['fridge_meat'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Pack Fish Meat'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Pack Fish Meat x10']
            },
            {
                name: 'Pack Crispy Fish Meat',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['fish_meat'],
                        amount: 1000
                    },
                    {
                        item: ITEMS['tcargodust'],
                        amount: 20
                    }
                ],
                products: [
                    {
                        item: ITEMS['fridge_meat'],
                        amount: 10
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Pack Crispy Fish Meat x10'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Pack Crispy Fish Meat x10']
            },
            {
                name: 'Pack Meat',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['meat'],
                        amount: 30
                    }
                ],
                products: [
                    {
                        item: ITEMS['fridge_meat'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Pack Meat'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Pack Meat x10']
            },
            {
                name: 'Pack Crispy Meat',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['meat'],
                        amount: 200
                    },
                    {
                        item: ITEMS['tcargodust'],
                        amount: 20
                    }
                ],
                products: [
                    {
                        item: ITEMS['fridge_meat'],
                        amount: 10
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Pack Crispy Meat x10'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Pack Crispy Meat x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Davis Mega Mall',
        recipes: [
            {
                name: 'Sell Propane',
                cost: -10000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_propane'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_propane'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell Propane'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Sell Propane x10']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Deep Quarry',
        recipes: [
            {
                name: 'Recycle Ore Mix',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 15
                    },
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 90
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Recycle Ore Mix'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Recycle Ore Mix']
            },
            {
                name: 'Use Explosives',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 20
                    },
                    {
                        item: ITEMS['scrap_gravel'],
                        amount: 30
                    }
                ],
                priority: -10,
                type: RecipeType.Recipe,
                path: ['Use Explosives'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Use Explosives']
            },
            {
                name: 'Gravel Pulverizing',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_gravel'],
                        amount: 20
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 100
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Gravel Pulverizing'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Gravel Pulverizing']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Trucking: Electronics Store',
        recipes: [
            {
                name: 'Deliver Copper Wire Spool',
                cost: -55000,
                ingredients: [
                    {
                        item: ITEMS['crafted_copperwire'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_copperwire'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Copper Wire Spool', 'Deliver Copper Wire Spool'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deliver Copper Wire Spool', 'Deliver Copper Wire Spool x10']
            },
            {
                name: 'Deliver Solder',
                cost: -5200,
                ingredients: [
                    {
                        item: ITEMS['refined_solder'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_solder'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Solder', 'Deliver Solder'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deliver Solder', 'Deliver Solder x10']
            },
            {
                name: 'Pick up Recycled Electronics',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['recycled_electronics'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up Recycled Electronics', 'Pick up Recycled Electronics'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Pick up Recycled Electronics', 'Pick up Recycled Electronics x2']
            },
            {
                name: 'Deliver Fiberglass Spool',
                cost: -60000,
                ingredients: [
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_fiberglass'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Fiberglass Spool', 'Deliver Fiberglass Spool'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deliver Fiberglass Spool', 'Deliver Fiberglass Spool x10']
            },
            {
                name: 'Deliver Amalgam',
                cost: -35000,
                ingredients: [
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_amalgam'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Amalgam', 'Deliver Amalgam'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deliver Amalgam', 'Deliver Amalgam x10']
            },
            {
                name: 'Deliver Circuit Boards',
                cost: -90000,
                ingredients: [
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_circuit'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Circuit Boards', 'Deliver Circuit Boards'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deliver Circuit Boards', 'Deliver Circuit Boards x10']
            }
        ],
        color: '#90EE90'
    },
    {
        name: 'Trucking: Elysian Island Waste Deposit',
        recipes: [
            {
                name: 'Exchange Iron',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_token_iron'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Exchange Iron'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Exchange Iron x10']
            },
            {
                name: 'Toxic Waste',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['recycled_waste'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Toxic Waste'],
                highestMultiplier: 3,
                highestMultiplierPath: ['Toxic Waste x3']
            },
            {
                name: 'Exchange Copper',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_token_copper'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Exchange Copper'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Exchange Copper x10']
            }
        ],
        color: '#00C8A4'
    },
    {
        name: 'Trucking: Filtering Plant',
        recipes: [
            {
                name: 'Mix Concrete',
                cost: 15000,
                ingredients: [
                    {
                        item: ITEMS['liquid_water'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_cement'],
                        amount: 5
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_concrete'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Mix Concrete'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Mix Concrete x2']
            },
            {
                name: 'Conveyor Filtering',
                cost: 30000,
                ingredients: [
                    {
                        item: ITEMS['mining_token_copper'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mining_token_iron'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_emerald'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 3
                    },
                    {
                        item: ITEMS['scrap_gravel'],
                        amount: 10
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Conveyor Filtering'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Conveyor Filtering']
            },
            {
                name: 'Filter Toxic Waste',
                cost: 15000,
                ingredients: [
                    {
                        item: ITEMS['recycled_waste'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_mercury'],
                        amount: 2
                    },
                    {
                        item: ITEMS['scrap_lead'],
                        amount: 2
                    },
                    {
                        item: ITEMS['scrap_acid'],
                        amount: 4
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Filter Toxic Waste'],
                highestMultiplier: 3,
                highestMultiplierPath: ['Filter Toxic Waste x3']
            },
            {
                name: 'Filter Gravel',
                cost: 15000,
                ingredients: [
                    {
                        item: ITEMS['scrap_gravel'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 6
                    },
                    {
                        item: ITEMS['refined_flint'],
                        amount: 4
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Filter Gravel'],
                highestMultiplier: 6,
                highestMultiplierPath: ['Filter Gravel x6']
            },
            {
                name: 'Filter Quarry Rubble',
                cost: 15000,
                ingredients: [
                    {
                        item: ITEMS['recycled_rubble'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_emerald'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 4
                    },
                    {
                        item: ITEMS['scrap_gravel'],
                        amount: 12
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Filter Quarry Rubble'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Filter Quarry Rubble x2']
            }
        ],
        color: '#D4A73E'
    },
    {
        name: 'Trucking: Fridgit Co.',
        recipes: [
            {
                name: 'Create Airline Meal',
                cost: 2500,
                ingredients: [
                    {
                        item: ITEMS['fridge_meat'],
                        amount: 1
                    },
                    {
                        item: ITEMS['fridge_veggies'],
                        amount: 1
                    },
                    {
                        item: ITEMS['fridge_dairy'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['fridge_airline_meal'],
                        amount: 4
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Airline Meals', 'Create Airline Meal'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Airline Meals', 'Create Airline Meal x10']
            },
            {
                name: 'Create Dairy Shipment',
                cost: 2500,
                ingredients: [
                    {
                        item: ITEMS['fridge_dairy'],
                        amount: 4
                    }
                ],
                products: [
                    {
                        item: ITEMS['fridge_store_delivery'],
                        amount: 5
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Food Shipments', 'Create Dairy Shipment'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Food Shipments', 'Create Dairy Shipment x10']
            }
        ],
        color: '#4169E1'
    },
    {
        name: 'Trucking: Grapeseed Farms',
        recipes: [
            {
                name: 'Pick up Dairy',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['fridge_dairy'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up Dairy'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Pick up Dairy x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Great Chaparral Farm',
        recipes: [
            {
                name: 'Pick up Vegetables',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['fridge_veggies'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up Vegetables'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Pick up Vegetables x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: GSD Gas Pumping Station',
        recipes: [
            {
                name: 'Extract Raw Gas',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['petrochem_gas'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Extract Raw Gas'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Extract Raw Gas x2']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Trucking: GSD Mine',
        recipes: [
            {
                name: 'Use Explosives',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_titanium_ore'],
                        amount: 4
                    },
                    {
                        item: ITEMS['scrap_gold'],
                        amount: 10
                    }
                ],
                priority: -10,
                type: RecipeType.Recipe,
                path: ['Use Explosives'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Use Explosives']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Trucking: Jewelry Store',
        recipes: [
            {
                name: 'Deliver Jewelry',
                cost: -95000,
                ingredients: [
                    {
                        item: ITEMS['crafted_jewelry'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_jewelry'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Jewelry'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Deliver Jewelry']
            },
            {
                name: 'Deliver Refined Gold',
                cost: -31000,
                ingredients: [
                    {
                        item: ITEMS['refined_gold'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_gold'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Refined Gold'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Deliver Refined Gold']
            },
            {
                name: 'Deliver Raw Emeralds',
                cost: -25000,
                ingredients: [
                    {
                        item: ITEMS['scrap_emerald'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['scrap_emerald'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Raw Emeralds'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deliver Raw Emeralds x10']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Land Act Reservoir',
        recipes: [
            {
                name: 'Pick up Unfiltered Water',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['liquid_water_raw'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up Unfiltered Water'],
                highestMultiplier: 3,
                highestMultiplierPath: ['Pick up Unfiltered Water x3']
            }
        ],
        color: '#3399FF'
    },
    {
        name: 'Trucking: Logging Camp',
        recipes: [
            {
                name: 'Collect Logs',
                cost: 7500,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['tcargologs'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Collect Logs'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Collect Logs x10']
            }
        ],
        color: '#B0623D'
    },
    {
        name: 'Trucking: LS Factory',
        recipes: [
            {
                name: 'Create Rebar',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['refined_bronze'],
                        amount: 2
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 6
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_rebar'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Rebar', 'Create Rebar'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Create Rebar', 'Create Rebar x2']
            },
            {
                name: 'Titanium Reinforcement',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['military_titanium'],
                        amount: 6
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_rebar'],
                        amount: 2
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Create Rebar', 'Titanium Reinforcement'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Create Rebar', 'Titanium Reinforcement']
            },
            {
                name: 'Create Jewelry',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['scrap_emerald'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_gold'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_jewelry'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Jewelry', 'Create Jewelry'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Create Jewelry', 'Create Jewelry']
            },
            {
                name: 'Titanium Jewelry',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['military_titanium'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_gold'],
                        amount: 4
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_jewelry'],
                        amount: 4
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Create Jewelry', 'Titanium Jewelry'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Create Jewelry', 'Titanium Jewelry']
            },
            {
                name: 'Create Fiberglass Spool',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['refined_planks'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 4
                    },
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 8
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Fiberglass Spool', 'Create Fiberglass Spool'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Create Fiberglass Spool', 'Create Fiberglass Spool x10']
            },
            {
                name: 'Create Cardboard',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['liquid_water'],
                        amount: 1
                    },
                    {
                        item: ITEMS['tcargodust'],
                        amount: 50
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_cardboard'],
                        amount: 5
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Craft Cardboard', 'Create Cardboard'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Craft Cardboard', 'Create Cardboard']
            },
            {
                name: 'Create Batteries',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['refined_solder'],
                        amount: 4
                    },
                    {
                        item: ITEMS['refined_zinc'],
                        amount: 2
                    },
                    {
                        item: ITEMS['scrap_acid'],
                        amount: 8
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_batteries'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Batteries', 'Create Batteries'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Create Batteries', 'Create Batteries x5']
            },
            {
                name: 'Create Copper Wire Spool',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['refined_planks'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_copper'],
                        amount: 4
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_copperwire'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Copper Wire Spool', 'Create Copper Wire Spool'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Create Copper Wire Spool', 'Create Copper Wire Spool x5']
            },
            {
                name: 'Create Circuit Boards',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['crafted_copperwire'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_solder'],
                        amount: 2
                    },
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Craft Circuit Boards', 'Create Circuit Boards'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Craft Circuit Boards', 'Create Circuit Boards x10']
            },
            {
                name: 'Create Computer',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_batteries'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_gold'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_computer'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Craft Computers', 'Create Computer'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Craft Computers', 'Create Computer x10']
            }
        ],
        color: '#8B0000'
    },
    {
        name: 'Trucking: LS Foundry',
        recipes: [
            {
                name: 'Refine Titanium',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['military_titanium_ore'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_titanium'],
                        amount: 1
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Titanium', 'Refine Titanium x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Titanium', 'Refine Titanium x10']
            },
            {
                name: 'Refine Copper',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_copper'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_copper'],
                        amount: 1
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Copper', 'Refine Copper x1'],
                highestMultiplier: 20,
                highestMultiplierPath: ['Refine Copper', 'Refine Copper x20']
            },
            {
                name: 'Refine Tin',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_tin'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_tin'],
                        amount: 1
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Tin', 'Refine Tin x1'],
                highestMultiplier: 20,
                highestMultiplierPath: ['Refine Tin', 'Refine Tin x20']
            },
            {
                name: 'Refine Solder',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_lead'],
                        amount: 2
                    },
                    {
                        item: ITEMS['refined_aluminum'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_solder'],
                        amount: 8
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Solder', 'Refine Solder'],
                highestMultiplier: 4,
                highestMultiplierPath: ['Refine Solder', 'Refine Solder x4']
            },
            {
                name: 'Refine Gold',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_gold'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_gold'],
                        amount: 5
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Gold', 'Refine Gold x10'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Gold', 'Refine Gold x10']
            },
            {
                name: 'Substitute Gold',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_sulfur'],
                        amount: 10
                    },
                    {
                        item: ITEMS['refined_bronze'],
                        amount: 25
                    },
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_gold'],
                        amount: 40
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Refine Gold', 'Substitute Gold'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Gold', 'Substitute Gold']
            },
            {
                name: 'Refine Bronze Alloy',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_tin'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_aluminum'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_copper'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_bronze'],
                        amount: 2
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Bronze Alloy', 'Refine Bronze Alloy x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Bronze Alloy', 'Refine Bronze Alloy x10']
            },
            {
                name: 'Refine Raw Ore Mix',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_zinc'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_copper'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Raw Ore Mix', 'Refine Raw Ore Mix x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Raw Ore Mix', 'Refine Raw Ore Mix x10']
            },
            {
                name: 'Copper Alloy',
                cost: 10000,
                ingredients: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 20
                    },
                    {
                        item: ITEMS['petrochem_sulfur'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_copper'],
                        amount: 20
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Refine Raw Ore Mix', 'Copper Alloy'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Raw Ore Mix', 'Copper Alloy']
            },
            {
                name: 'Zinc Alloy',
                cost: 10000,
                ingredients: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 20
                    },
                    {
                        item: ITEMS['petrochem_propane'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_zinc'],
                        amount: 20
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Refine Raw Ore Mix', 'Zinc Alloy'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Raw Ore Mix', 'Zinc Alloy']
            },
            {
                name: 'Refine Amalgam',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['refined_tin'],
                        amount: 2
                    },
                    {
                        item: ITEMS['scrap_mercury'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 2
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Amalgam', 'Refine Amalgam'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Amalgam', 'Refine Amalgam x10']
            },
            {
                name: 'Refine Aluminum',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['scrap_aluminum'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_aluminum'],
                        amount: 1
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Aluminum', 'Refine Aluminum x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Aluminum', 'Refine Aluminum x10']
            },
            {
                name: 'Refine Glass',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_glass'],
                        amount: 1
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Refine Glass', 'Refine Glass x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Glass', 'Refine Glass x10']
            },
            {
                name: 'Hardened Steel',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['military_titanium'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mining_token_iron'],
                        amount: 5
                    }
                ],
                products: [
                    {
                        item: ITEMS['tavi_hardened_steel'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Steel', 'Hardened Steel'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Steel', 'Hardened Steel']
            },
            {
                name: 'Ceramic Tiles',
                cost: 1000,
                ingredients: [
                    {
                        item: ITEMS['refined_flint'],
                        amount: 10
                    },
                    {
                        item: ITEMS['refined_sand'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_ceramictiles'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Ceramic Tiles', 'Ceramic Tiles'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Refine Ceramic Tiles', 'Ceramic Tiles x10']
            }
        ],
        color: '#C71585'
    },
    {
        name: 'Trucking: LS Oil Pumping Station',
        recipes: [
            {
                name: 'Extract Crude Oil',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['petrochem_oil'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Extract Crude Oil'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Extract Crude Oil x2']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Trucking: LS Port Export',
        recipes: [
            {
                name: 'Export Planks',
                cost: -14400,
                ingredients: [
                    {
                        item: ITEMS['refined_planks'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_planks'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Planks', 'Export Planks x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Planks', 'Export Planks x10']
            },
            {
                name: 'Export Refined Bronze Alloy',
                cost: -32000,
                ingredients: [
                    {
                        item: ITEMS['refined_bronze'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_bronze'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Refined Bronze Alloy', 'Export Refined Bronze Alloy x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Refined Bronze Alloy', 'Export Refined Bronze Alloy x10']
            },
            {
                name: 'Export Sawdust',
                cost: -1800,
                ingredients: [
                    {
                        item: ITEMS['tcargodust'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['tcargodust'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Sawdust', 'Export Sawdust x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Sawdust', 'Export Sawdust x10']
            },
            {
                name: 'Export Aluminum',
                cost: -8400,
                ingredients: [
                    {
                        item: ITEMS['refined_aluminum'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_aluminum'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Aluminum', 'Export Aluminum x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Aluminum', 'Export Aluminum x10']
            },
            {
                name: 'Export Batteries',
                cost: -150000,
                ingredients: [
                    {
                        item: ITEMS['crafted_batteries'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_batteries'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Batteries', 'Export Batteries x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Batteries', 'Export Batteries x10']
            },
            {
                name: 'Export Copper',
                cost: -10000,
                ingredients: [
                    {
                        item: ITEMS['refined_copper'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_copper'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Copper', 'Export Copper x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Copper', 'Export Copper x10']
            },
            {
                name: 'Export Tin',
                cost: -8400,
                ingredients: [
                    {
                        item: ITEMS['refined_tin'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_tin'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Tin', 'Export Tin x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Tin', 'Export Tin x10']
            },
            {
                name: 'Export Refined Glass',
                cost: -10000,
                ingredients: [
                    {
                        item: ITEMS['refined_glass'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_glass'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Refined Glass', 'Export Refined Glass x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Refined Glass', 'Export Refined Glass x10']
            },
            {
                name: 'Export Rubber',
                cost: -10000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_rubber'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['mechanicals_rubber'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Vehicle Parts', 'Export Rubber'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Vehicle Parts', 'Export Rubber x10']
            },
            {
                name: 'Export Vehicle Framework',
                cost: -350000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['mechanicals_vehicle_framework'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Vehicle Parts', 'Export Vehicle Framework'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Export Vehicle Parts', 'Export Vehicle Framework']
            },
            {
                name: 'Export Zinc',
                cost: -11600,
                ingredients: [
                    {
                        item: ITEMS['refined_zinc'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_zinc'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Zinc', 'Export Zinc x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Zinc', 'Export Zinc x10']
            },
            {
                name: 'Ceramic Tiles',
                cost: -40000,
                ingredients: [
                    {
                        item: ITEMS['crafted_ceramictiles'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_ceramictiles'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Ceramic Tiles', 'Ceramic Tiles'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Ceramic Tiles', 'Ceramic Tiles x10']
            },
            {
                name: 'Computer',
                cost: -210000,
                ingredients: [
                    {
                        item: ITEMS['crafted_computer'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_computer'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Computers', 'Computer'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Computers', 'Computer x10']
            },
            {
                name: 'Export Acid',
                cost: -12800,
                ingredients: [
                    {
                        item: ITEMS['scrap_acid'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['scrap_acid'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Acid', 'Export Acid x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Export Acid', 'Export Acid x10']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: LSIA Shipments',
        recipes: [
            {
                name: 'Deliver Airline Meal',
                cost: -6500,
                ingredients: [
                    {
                        item: ITEMS['fridge_airline_meal'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['fridge_airline_meal'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Airline Meal'],
                highestMultiplier: 30,
                highestMultiplierPath: ['Deliver Airline Meal x30']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: McKenzie Export',
        recipes: [
            {
                name: 'Export Scrap Plastic',
                cost: -3600,
                ingredients: [
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['scrap_plastic'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Scrap Plastic'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Export Scrap Plastic x100']
            },
            {
                name: 'Export Flint',
                cost: -4250,
                ingredients: [
                    {
                        item: ITEMS['refined_flint'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_flint'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Flint'],
                highestMultiplier: 100,
                highestMultiplierPath: ['Export Flint x100']
            },
            {
                name: 'Export Cardboard',
                cost: -60000,
                ingredients: [
                    {
                        item: ITEMS['crafted_cardboard'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['crafted_cardboard'],
                    amount: 1
                },
                priority: -1,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Export Cardboard'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Export Cardboard x5']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Military Workshop',
        recipes: [
            {
                name: 'Create Explosives',
                cost: 9500,
                ingredients: [
                    {
                        item: ITEMS['petrochem_sulfur'],
                        amount: 10
                    },
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 8
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Explosives'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Create Explosives']
            },
            {
                name: 'Deliver Titanium',
                cost: -75000,
                ingredients: [
                    {
                        item: ITEMS['military_titanium'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['military_titanium'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Titanium'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Deliver Titanium']
            }
        ],
        color: '#929292'
    },
    {
        name: 'Trucking: Mineral Mine',
        recipes: [
            {
                name: 'Use Explosives',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_titanium_ore'],
                        amount: 4
                    },
                    {
                        item: ITEMS['scrap_emerald'],
                        amount: 10
                    }
                ],
                priority: -10,
                type: RecipeType.Recipe,
                path: ['Use Explosives'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Use Explosives']
            },
            {
                name: 'Exchange Copper Ore',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_copper'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['mining_token_copper'],
                        amount: 1
                    }
                ],
                priority: -10,
                type: RecipeType.Recipe,
                path: ['Exchange Copper Ore'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Exchange Copper Ore x10']
            },
            {
                name: 'Exchange Iron Ore',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_iron'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['mining_token_iron'],
                        amount: 1
                    }
                ],
                priority: -10,
                type: RecipeType.Recipe,
                path: ['Exchange Iron Ore'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Exchange Iron Ore x10']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Trucking: Oil Depository',
        recipes: [
            {
                name: 'Fill Helicoper Cans',
                cost: -11000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_kerosene'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Fill Helicoper Cans'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Fill Helicoper Cans']
            },
            {
                name: 'Fill Plane Cans',
                cost: -11000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_kerosene'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Fill Plane Cans'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Fill Plane Cans']
            },
            {
                name: 'Fill Boat Cans',
                cost: -8000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_diesel'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Fill Boat Cans'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Fill Boat Cans']
            },
            {
                name: 'Fill Diesel Cans',
                cost: -8000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_diesel'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Fill Diesel Cans'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Fill Diesel Cans']
            },
            {
                name: 'Fill Petrol Cans',
                cost: -4000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['petrochem_petrol'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Fill Petrol Cans'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Fill Petrol Cans']
            }
        ],
        color: '#800080'
    },
    {
        name: 'Trucking: Quarry',
        recipes: [
            {
                name: 'Create Cement',
                cost: 1500,
                ingredients: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 5
                    },
                    {
                        item: ITEMS['tcargodust'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['crafted_cement'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Create Cement'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Create Cement x10']
            },
            {
                name: 'Deliver Sand',
                cost: -1500,
                ingredients: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['refined_sand'],
                    amount: 1
                },
                priority: 0,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Deliver Sand'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Deliver Sand']
            },
            {
                name: 'Pick up Quarry Rubble',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['recycled_rubble'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up Quarry Rubble'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Pick up Quarry Rubble x2']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Trucking: Raven Slaughterhouse',
        recipes: [
            {
                name: 'Wolf',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_wolf'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 20
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Wolf', 'Wolf x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Wolf', 'Wolf x10']
            },
            {
                name: 'Rabbit',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_rabbit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Rabbit', 'Rabbit x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Rabbit', 'Rabbit x10']
            },
            {
                name: 'Lion',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_lion'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 20
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Lion', 'Lion x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Lion', 'Lion x10']
            },
            {
                name: 'Brown Bear',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_bear'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 40
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Brown Bear', 'Brown Bear x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Brown Bear', 'Brown Bear x10']
            },
            {
                name: 'Leopard',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_leopard'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 20
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Leopard', 'Leopard x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Leopard', 'Leopard x10']
            },
            {
                name: 'Deer',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_deer'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 12
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Deer', 'Deer x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Deer', 'Deer x10']
            },
            {
                name: 'Coyote',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_coyote'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 6
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Coyote', 'Coyote x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Coyote', 'Coyote x10']
            },
            {
                name: 'Cougar',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_mtlion'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 10
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Cougar', 'Cougar x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Cougar', 'Cougar x10']
            },
            {
                name: 'Boar',
                cost: 2000,
                ingredients: [
                    {
                        item: ITEMS['hide_boar'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['meat'],
                        amount: 20
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Boar', 'Boar x1'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Boar', 'Boar x10']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Recycling Center',
        recipes: [
            {
                name: 'Pick up Recycled Trash',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['recycled_trash'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Import,
                path: ['Pick up Recycled Trash'],
                highestMultiplier: 3,
                highestMultiplierPath: ['Pick up Recycled Trash x3']
            }
        ],
        color: '#90EE90'
    },
    {
        name: 'Trucking: Refinery',
        recipes: [
            {
                name: 'Refine Crude Oil',
                cost: 10250,
                ingredients: [
                    {
                        item: ITEMS['petrochem_oil'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 1
                    },
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 2
                    },
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Crude Oil'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Refine Crude Oil x2']
            },
            {
                name: 'Create Asphalt',
                cost: 10250,
                ingredients: [
                    {
                        item: ITEMS['petrochem_oil'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_gravel'],
                        amount: 20
                    }
                ],
                products: [
                    {
                        item: ITEMS['petrochem_asphalt'],
                        amount: 20
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Create Asphalt'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Create Asphalt']
            },
            {
                name: 'Refine Raw Gas',
                cost: 10250,
                ingredients: [
                    {
                        item: ITEMS['petrochem_gas'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_chemicals'],
                        amount: 2
                    },
                    {
                        item: ITEMS['petrochem_propane'],
                        amount: 2
                    },
                    {
                        item: ITEMS['petrochem_waste'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Raw Gas'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Refine Raw Gas x2']
            },
            {
                name: 'Refine Rubber',
                cost: 41000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_oil'],
                        amount: 4
                    }
                ],
                products: [
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 4
                    },
                    {
                        item: ITEMS['mechanicals_rubber'],
                        amount: 4
                    },
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 2
                    },
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Refine Rubber'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Rubber']
            },
            {
                name: 'Refine Diluted Fuel',
                cost: 10250,
                ingredients: [
                    {
                        item: ITEMS['petrochem_oil'],
                        amount: 3
                    },
                    {
                        item: ITEMS['liquid_water'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 3
                    },
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 3
                    },
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 20
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Refine Diluted Fuel'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Refine Diluted Fuel']
            }
        ],
        color: '#525252'
    },
    {
        name: 'Trucking: Sandstone Collector',
        recipes: [
            {
                name: 'Scrap Lead',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 3
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_lead'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Scrap Lead'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Scrap Lead']
            },
            {
                name: 'Scrap Mercury',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 3
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_mercury'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Scrap Mercury'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Scrap Mercury']
            },
            {
                name: 'Scrap Aluminum',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_aluminum'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Scrap Aluminum'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Scrap Aluminum']
            },
            {
                name: 'Raw Emeralds',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_emerald'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Raw Emeralds'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Raw Emeralds']
            },
            {
                name: 'Scrap Copper',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_copper'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Scrap Copper'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Scrap Copper']
            },
            {
                name: 'Titanium Ore',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 5
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_titanium_ore'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Titanium Ore'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Titanium Ore']
            },
            {
                name: 'Scrap Tin',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_tin'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Scrap Tin'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Scrap Tin']
            },
            {
                name: 'Raw Ore Mix',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 3
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_ore'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Raw Ore Mix'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Raw Ore Mix']
            },
            {
                name: 'Sell Directly',
                cost: -7500,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 1
                    }
                ],
                exportItem: {
                    item: ITEMS['mining_credit'],
                    amount: 1
                },
                priority: -100,
                type: RecipeType.Export,
                color: '#800080',
                path: ['Sell Directly'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Sell Directly']
            },
            {
                name: 'Sand',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_sand'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Sand'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Sand']
            },
            {
                name: 'Flint',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mining_credit'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_flint'],
                        amount: 1
                    }
                ],
                priority: -100,
                type: RecipeType.Recipe,
                path: ['Flint'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Flint']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Sawmill',
        recipes: [
            {
                name: 'Sawdust Filler Exploit',
                cost: 2500,
                ingredients: [
                    {
                        item: ITEMS['tcargologs'],
                        amount: 5
                    },
                    {
                        item: ITEMS['refined_sand'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['tcargodust'],
                        amount: 100
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Grind Sawdust', 'Sawdust Filler Exploit'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Grind Sawdust', 'Sawdust Filler Exploit']
            },
            {
                name: 'Grind Sawdust',
                cost: 500,
                ingredients: [
                    {
                        item: ITEMS['tcargologs'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['tcargodust'],
                        amount: 10
                    }
                ],
                priority: 1,
                type: RecipeType.Recipe,
                path: ['Grind Sawdust', 'Grind Sawdust x1'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Grind Sawdust', 'Grind Sawdust x5']
            },
            {
                name: 'Mill Planks',
                cost: 500,
                ingredients: [
                    {
                        item: ITEMS['tcargologs'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_planks'],
                        amount: 1
                    },
                    {
                        item: ITEMS['tcargodust'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Mill Planks', 'Mill Planks x1'],
                highestMultiplier: 5,
                highestMultiplierPath: ['Mill Planks', 'Mill Planks x5']
            },
            {
                name: 'Chipboard Planks',
                cost: 2500,
                ingredients: [
                    {
                        item: ITEMS['tcargologs'],
                        amount: 5
                    },
                    {
                        item: ITEMS['tcargodust'],
                        amount: 30
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_planks'],
                        amount: 15
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Mill Planks', 'Chipboard Planks'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Mill Planks', 'Chipboard Planks']
            }
        ],
        color: '#90421D'
    },
    {
        name: 'Trucking: Sorting Facility',
        recipes: [
            {
                name: 'Sort Recycled Electronics',
                cost: 25000,
                ingredients: [
                    {
                        item: ITEMS['recycled_electronics'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_gold'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_copper'],
                        amount: 8
                    },
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 12
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Sort Recycled Electronics'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Sort Recycled Electronics x2']
            },
            {
                name: 'Sort Recycled Trash',
                cost: 25000,
                ingredients: [
                    {
                        item: ITEMS['recycled_trash'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['scrap_tin'],
                        amount: 4
                    },
                    {
                        item: ITEMS['scrap_aluminum'],
                        amount: 4
                    },
                    {
                        item: ITEMS['scrap_plastic'],
                        amount: 8
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Sort Recycled Trash'],
                highestMultiplier: 3,
                highestMultiplierPath: ['Sort Recycled Trash x3']
            }
        ],
        color: '#006400'
    },
    {
        name: 'Trucking: Vehicle Factory',
        recipes: [
            {
                name: 'Coil Rocket Voltic',
                cost: 90110000,
                ingredients: [
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 50
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 5
                    },
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 15
                    },
                    {
                        item: ITEMS['petrochem_kerosene'],
                        amount: 100
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['upgrade_kit_voltic2'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Coil Rocket Voltic'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Coil Rocket Voltic']
            },
            {
                name: 'HVY Nightshark',
                cost: 13780000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 2
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 15
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 2
                    },
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 12
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 2
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 40
                    },
                    {
                        item: ITEMS['military_titanium'],
                        amount: 60
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['liquid_water'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|nightshark|HVY Nightshark|car'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['HVY Nightshark'],
                highestMultiplier: 1,
                highestMultiplierPath: ['HVY Nightshark']
            },
            {
                name: '10F',
                cost: 22500000,
                ingredients: [
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 5
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 50
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 25
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|tenf|10F|car'],
                        amount: 1
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['10F'],
                highestMultiplier: 1,
                highestMultiplierPath: ['10F']
            },
            {
                name: 'Karin Futo',
                cost: 220000,
                ingredients: [
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 5
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 50
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 15
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|futo|Karin Futo|car'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Karin Futo'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Karin Futo']
            },
            {
                name: 'Coil Savanna',
                cost: 8380000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_battery_evb'],
                        amount: 3
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 5
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 35
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 50
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|savanna|Coil Savanna|car'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Coil Savanna'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Coil Savanna']
            },
            {
                name: 'ZR-350',
                cost: 1620000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 5
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 15
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 50
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|zr350|ZR-350|car'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['ZR-350'],
                highestMultiplier: 1,
                highestMultiplierPath: ['ZR-350']
            },
            {
                name: 'Hijak Vertice',
                cost: 320000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 5
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 15
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 25
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 50
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|vertice|Hijak Vertice|car'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Hijak Vertice'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Hijak Vertice']
            },
            {
                name: 'Dundreary Landstalker XL',
                cost: 32000000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 2
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 4
                    },
                    {
                        item: ITEMS['crafted_circuit'],
                        amount: 10
                    },
                    {
                        item: ITEMS['crafted_fiberglass'],
                        amount: 30
                    },
                    {
                        item: ITEMS['refined_glass'],
                        amount: 50
                    },
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 100
                    }
                ],
                products: [
                    {
                        item: ITEMS['vehicle_shipment|landstalker2|Landstalker XL|car'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Dundreary Landstalker XL'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Dundreary Landstalker XL']
            },
            {
                name: 'Shipping Container',
                cost: 1000000,
                ingredients: [
                    {
                        item: ITEMS['refined_planks'],
                        amount: 10
                    },
                    {
                        item: ITEMS['tavi_hardened_steel'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['shipping_crate_empty'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['1x Shipping Container'],
                highestMultiplier: 1,
                highestMultiplierPath: ['1x Shipping Container']
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Vehicle Parts',
        recipes: [
            {
                name: 'Temporary Repair Shop',
                cost: 1500000,
                ingredients: [
                    {
                        item: ITEMS['pucargosmall'],
                        amount: 2
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 2
                    },
                    {
                        item: ITEMS['military_titanium'],
                        amount: 2
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['repair_shop'],
                        amount: 20
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Temporary Repair Shop'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Temporary Repair Shop']
            },
            {
                name: 'Chassis',
                cost: 100000,
                ingredients: [
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 15
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Chassis'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Chassis']
            },
            {
                name: 'Vehicle Framework',
                cost: 250000,
                ingredients: [
                    {
                        item: ITEMS['refined_amalgam'],
                        amount: 25
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Vehicle Framework'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Vehicle Framework']
            },
            {
                name: 'Car Battery',
                cost: 35000,
                ingredients: [
                    {
                        item: ITEMS['crafted_batteries'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Car Battery'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Car Battery']
            },
            {
                name: 'Wheels',
                cost: 20000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_rubber'],
                        amount: 10
                    },
                    {
                        item: ITEMS['refined_aluminum'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Wheels'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Wheels']
            },
            {
                name: 'Traction Battery',
                cost: 120000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 6
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanicals_battery_evb'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Traction Battery'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Traction Battery']
            },
            {
                name: 'Jumper Cable',
                cost: 3000,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_rubber'],
                        amount: 1
                    },
                    {
                        item: ITEMS['crafted_copperwire'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['mechanicals_jumper_cable'],
                        amount: 2
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: [], // TODO
                highestMultiplier: 1,
                highestMultiplierPath: [] // TODO
            }
        ],
        color: '#808080'
    },
    {
        name: 'Trucking: Water Treatment Plant',
        recipes: [
            {
                name: 'Clean Waste Water',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_waste'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['liquid_water'],
                        amount: 1
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Clean Waste Water'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Clean Waste Water']
            },
            {
                name: 'Treat Waste Water',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['petrochem_waste'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['petrochem_sulfur'],
                        amount: 5
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Treat Waste Water'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Treat Waste Water x2']
            },
            {
                name: 'Treat Unfiltered Water',
                cost: 5000,
                ingredients: [
                    {
                        item: ITEMS['liquid_water_raw'],
                        amount: 1
                    },
                    {
                        item: ITEMS['scrap_acid'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['liquid_water'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Treat Unfiltered Water'],
                highestMultiplier: 2,
                highestMultiplierPath: ['Treat Unfiltered Water x2']
            }
        ],
        color: '#3399FF'
    }
] as const;

const _CUSTOM_LOCATIONS: DeepOmit<Location, 'recipes.0.location'>[] = [
    {
        name: 'Mineshaft',
        recipes: [
            {
                name: 'Mine Iron Ore',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['mining_iron'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: [],
                highestMultiplier: 1,
                highestMultiplierPath: []
            },
            {
                name: 'Mine Copper Ore',
                cost: 0,
                ingredients: [],
                products: [
                    {
                        item: ITEMS['mining_copper'],
                        amount: 1
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: [],
                highestMultiplier: 1,
                highestMultiplierPath: []
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Roxite Mine',
        recipes: [
            {
                name: 'Abuse Explosives',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['refined_flint'],
                        amount: 80
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Abuse Explosives'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Abuse Explosives']
            },
            {
                name: 'Use Explosives',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['military_explosives'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['military_titanium_ore'],
                        amount: 10
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Use Explosives'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Use Explosives']
            }
        ],
        color: '#D3D3D3'
    },
    {
        name: 'Roxwood Fruit Market',
        recipes: [
            {
                name: 'Sell Food',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['fridge_store_delivery'],
                        amount: 1
                    }
                ],
                products: [
                    {
                        item: ITEMS['exp_token_a|farming|farming'],
                        amount: 10
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Sell Food'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Sell Food']
            }
        ],
        color: '#228B22'
    },
    {
        name: 'Roxwood Loft Market',
        recipes: [
            {
                name: 'Feed the Hunters',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['fridge_store_delivery'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['exp_token_a|hunting|skill'],
                        amount: 100
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Feed the Hunters'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Feed the Hunters']
            }
        ],
        color: '#8B4513'
    },
    {
        name: 'Roxwood Intl. Raceway',
        recipes: [
            {
                name: 'Re-stock Fuel Tank',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['petrochem_petrol'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['exp_token_a|player|racing'],
                        amount: 100
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Re-stock Fuel Tank'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Re-stock Fuel Tank']
            },
            {
                name: 'Spare Parts',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['mechanicals_battery'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_chassis'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_vehicle_framework'],
                        amount: 1
                    },
                    {
                        item: ITEMS['mechanicals_wheels'],
                        amount: 2
                    }
                ],
                products: [
                    {
                        item: ITEMS['exp_token_a|player|racing'],
                        amount: 250
                    }
                ],
                priority: -1,
                type: RecipeType.Recipe,
                path: ['Spare Parts'],
                highestMultiplier: 10,
                highestMultiplierPath: ['Spare Parts x10']
            }
        ],
        color: '#FF4500'
    },
    {
        name: 'Roxwood Marina',
        recipes: [
            {
                name: 'Re-supply Marina',
                cost: 0,
                ingredients: [
                    {
                        item: ITEMS['petrochem_diesel'],
                        amount: 10
                    }
                ],
                products: [
                    {
                        item: ITEMS['exp_token_a|farming|fishing'],
                        amount: 100
                    }
                ],
                priority: 0,
                type: RecipeType.Recipe,
                path: ['Re-supply Marina'],
                highestMultiplier: 1,
                highestMultiplierPath: ['Re-supply Marina']
            }
        ],
        color: '#1E90FF'
    },
    {
        name: 'Custom Recipes',
        recipes: [],
        color: '#3E516CFF'
    }
];

const _ALL_LOCATIONS = [..._LOCATIONS, ..._CUSTOM_LOCATIONS];

export const LOCATIONS: Location[] = _ALL_LOCATIONS.map((location) => ({
    ...location,
    recipes: location.recipes.map((recipe) => ({ ...recipe, location: location.name }) as Recipe) as Recipe[]
}));

export const DEFAULT_COLOR = '#808080';

export const DEFAULT_STORAGE_COLOR = '#5D3A9B';

const SELF_STORAGES: Record<StorageId, Storage> = {
    bctp: {
        name: 'Blaine County Tractor Parts',
        id: 'bctp',
        positions: [
            {
                x: 388.36904907227,
                y: 3586.8146972656,
                z: 33.29222869873
            },
            {
                x: 314.23321533203,
                y: 3633.7976074219,
                z: 30.525358200073
            }
        ],
        size: 400000,
        fee: 50,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    pbsf: {
        name: 'Paleto Bay Self Storage',
        id: 'pbsf',
        positions: [
            {
                x: 46.444091796875,
                y: 6458.7602539063,
                z: 31.425287246704
            },
            {
                x: -37.641159057617,
                y: 7057.8452148438,
                z: 2.0027375221252
            },
            {
                x: -455.48385620117,
                y: 6552.7553710938,
                z: 10.766058921814
            }
        ],
        size: 600000,
        fee: 200,
        type: StorageType.Storage,
        priority: StoragePriority.PaletoBay
    },
    bhsl: {
        name: 'Big House Storage LSIA',
        id: 'bhsl',
        positions: [
            {
                x: -512.517578125,
                y: -2200.123046875,
                z: 6.3940262794495
            }
        ],
        size: 2500000,
        fee: 100,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    tsu: {
        name: 'The Secure Unit',
        id: 'tsu',
        positions: [
            {
                x: 911.31066894531,
                y: -1256.2835693359,
                z: 25.5778465271
            }
        ],
        size: 1500000,
        fee: 200,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    dpss: {
        name: 'Del Perro Self Storage',
        id: 'dpss',
        positions: [
            {
                x: -1614.7346191406,
                y: -821.41516113281,
                z: 10.070293426514
            },
            {
                x: -1842.6529541016,
                y: -1006.7001342773,
                z: 1.0
            }
        ],
        size: 800000,
        fee: 100,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    gohq: {
        name: 'Palmer-Taylor Power Station',
        id: 'gohq',
        positions: [
            {
                x: 2674.7131347656,
                y: 1429.8662109375,
                z: 24.500797271729
            }
        ],
        size: 1000000,
        fee: 100,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    fthq: {
        name: 'Pillbox Hill Storage Unit',
        id: 'fthq',
        positions: [
            {
                x: 340.37985229492,
                y: -561.98333740234,
                z: 28.743785858154
            }
        ],
        size: 1000000,
        fee: 100,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    bats: {
        name: 'Rogers Salvage & Scrap',
        id: 'bats',
        positions: [
            {
                x: -639.17358398438,
                y: -1727.0373535156,
                z: 24.31266784668
            }
        ],
        size: 1000000,
        fee: 100,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    fyrecay: {
        name: 'Cayo Perico Airfield',
        id: 'fyrecay',
        positions: [
            {
                x: 4448.3725585938,
                y: -4483.0600585938,
                z: 4.2335081100464
            }
        ],
        size: 400000,
        fee: 50,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    }
} as Record<StorageId, Omit<Storage, 'defaultPriority'>> as any;

const BUSINESS_SELF_STORAGES: Record<StorageId, Storage> = {
    biz_hookies: {
        name: 'Hookies',
        id: 'biz_hookies',
        positions: [
            {
                x: -2209.091553,
                y: 4246.66748,
                z: 47.55793,
                h: 340.259369
            }
        ],
        size: 100000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_granny: {
        name: "Grandma's House",
        id: 'biz_granny',
        positions: [
            {
                x: 2195.722412,
                y: 5606.561035,
                z: 53.54073,
                h: 336.438324
            }
        ],
        size: 100000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_yellowjack: {
        name: 'Yellowjack',
        id: 'biz_yellowjack',
        positions: [
            {
                x: 1995.205444,
                y: 3036.047119,
                z: 47.026821,
                h: 325.128418
            }
        ],
        size: 350000,
        fee: 10,
        type: StorageType.Storage,
        priority: StoragePriority.Yellowjack
    },
    biz_stripclub: {
        name: 'Vanilla Unicorn',
        id: 'biz_stripclub',
        positions: [
            {
                x: 138.807602,
                y: -1277.245728,
                z: 29.318634,
                h: 118.81456
            }
        ],
        size: 100000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_ltweld: {
        name: 'LT Weld Supply Co',
        id: 'biz_ltweld',
        positions: [
            {
                x: 1175.7137451172,
                y: -1316.5482177734,
                z: 34.798126220703,
                h: 174.53958129883
            }
        ],
        size: 500000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_walker: {
        name: 'Walker Logistics',
        id: 'biz_walker',
        positions: [
            {
                x: 126.76761627197,
                y: -3212.6791992188,
                z: 5.8929586410522
            }
        ],
        size: 500000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_lsia: {
        name: 'L.S.I.A.',
        id: 'biz_lsia',
        positions: [
            {
                x: -1205.3310546875,
                y: -2630.728515625,
                z: 13.944932937622,
                h: 325.30377197266
            },
            {
                x: -1079.0277099609,
                y: -2865.3129882813,
                z: 13.950700759888,
                h: 326.36962890625
            },
            {
                x: -1380.2336425781,
                y: -3241.2841796875,
                z: 13.944814682007,
                h: 242.47793579102
            }
        ],
        size: 1500000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_murrietta_oil: {
        name: 'CollinsCo',
        id: 'biz_murrietta_oil',
        positions: [
            {
                x: 1735.63562,
                y: -1538.411499,
                z: 112.705345,
                h: 314.896423
            }
        ],
        size: 1500000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_playboi: {
        name: 'Playboy Mansion',
        id: 'biz_playboi',
        positions: [
            {
                x: -1550.971924,
                y: 130.134979,
                z: 56.787189,
                h: 131.729889
            }
        ],
        size: 500000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_vineyard: {
        name: 'Vineyard',
        id: 'biz_vineyard',
        positions: [
            {
                x: -1922.0493164063,
                y: 2047.1319580078,
                z: 140.73503112793
            }
        ],
        size: 500000,
        fee: 0,
        type: StorageType.Storage,
        priority: StoragePriority.UnknownStorage
    },
    biz_train: {
        name: 'Train Network',
        id: 'biz_train',
        positions: [
            {
                x: 151.61253356934,
                y: 6403.0478515625,
                z: 31.177011489868
            },
            {
                x: 2928.67578125,
                y: 4627.6127929688,
                z: 48.545486450195
            },
            {
                x: 2687.3676757813,
                y: 2767.3159179688,
                z: 37.877990722656
            },
            {
                x: -114.83979034424,
                y: -2576.6413574219,
                z: 6.0007061958313
            },
            {
                x: 796.67376708984,
                y: -3215.5600585938,
                z: 5.8998837471008
            },
            {
                x: 1972.3913574219,
                y: 3636.4680175781,
                z: 34.889045715332
            },
            {
                x: 735.12860107422,
                y: -878.39239501953,
                z: 25.026447296143
            },
            {
                x: 511.85794067383,
                y: -625.4267578125,
                z: 24.758949279785
            },
            {
                x: 4902.7143554688,
                y: -5194.22265625,
                z: 2.4385457038879
            },
            {
                x: 4940.45703125,
                y: -5132.0825195312,
                z: 0.87203848361969
            },
            {
                x: 2690.7902832031,
                y: 1356.7669677734,
                z: 24.520862579346
            }
        ],
        size: 621420 /* TODO */,
        fee: 250,
        type: StorageType.Storage,
        priority: StoragePriority.Train
    }
} as Record<StorageId, Omit<Storage, 'defaultPriority'>> as any;

export const FACTION_STORAGE: Storage = {
    name: 'Faction Storage',
    id: 'faction',
    positions: [
        /* TODO */
    ],
    size: 50000,
    fee: 0,
    type: StorageType.Storage,
    priority: StoragePriority.Faction
} as Omit<Storage, 'defaultPriority'> as any;

export const INVENTORY_STORAGE: Storage = {
    name: 'Inventory',
    id: 'inventory',
    vrpName: 'inventory',
    positions: [],
    size: 300,
    fee: 0,
    type: StorageType.Inventory,
    priority: StoragePriority.Inventory
} as Omit<Storage, 'defaultPriority'> as any;

export const BACKPACK_STORAGE: Storage = {
    name: 'Backpack',
    id: 'backpack',
    positions: [],
    size: 300,
    fee: 0,
    type: StorageType.Backpack,
    priority: StoragePriority.Backpack
} as Omit<Storage, 'defaultPriority'> as any;

export const VEHICLE_STORAGES: Record<string, Storage> = {
    trailerswb: {
        name: 'MK1',
        id: 'trailerswb',
        positions: [],
        size: 400,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    trailerlogs2: {
        name: 'MK3',
        id: 'trailerlogs2',
        positions: [],
        size: 600,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    botdumptr: {
        name: 'MK4',
        id: 'botdumptr',
        positions: [],
        size: 775,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    drybulktr: {
        name: 'MK5',
        id: 'drybulktr',
        positions: [],
        size: 1000,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    dumptr: {
        name: 'MK6',
        id: 'dumptr',
        positions: [],
        size: 1500,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    docktrailer2: {
        name: 'MK7',
        id: 'docktrailer2',
        positions: [],
        size: 2200,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    docktrailer: {
        name: 'MK8',
        id: 'docktrailer',
        positions: [],
        size: 2500,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    trailers2: {
        name: 'MK9',
        id: 'trailers2',
        positions: [],
        size: 2750,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    trailerswb2: {
        name: 'MK10',
        id: 'trailerswb2',
        vrpName: 'Refrigerated Trailer (MK10) (trailerswb2)',
        positions: [],
        size: 3000,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    tvtrailer: {
        name: 'MK11',
        id: 'tvtrailer',
        vrpName: 'Trailer (tvtrailer)',
        positions: [],
        size: 3500,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    tvtrailer2: {
        name: 'MK12',
        id: 'tvtrailer2',
        vrpName: 'Trailer (tvtrailer2)',
        positions: [],
        size: 5000,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    boxlongtr: {
        name: 'MK13',
        id: 'boxlongtr',
        vrpName: 'Box Trailer (MK13) (boxlongtr)',
        positions: [],
        size: 8500,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    trailerlarge: {
        name: 'MK14',
        id: 'trailerlarge',
        vrpName: 'Mobile Operations Center (MK14) (trailerlarge)',
        positions: [],
        size: 9000,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    },
    mk15: {
        name: 'MK15',
        id: 'mk15',
        vrpName: 'Chernobog Toter (mk15)',
        positions: [],
        size: 6000,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Cab,
        priority: StoragePriority.Vehicle
    },
    xmtrailer: {
        name: 'eCola Trailer',
        id: 'xmtrailer',
        vrpName: 'eCola Trailer (xmtrailer)',
        positions: [],
        size: 8500,
        fee: 0,
        type: StorageType.Vehicle,
        vehicleType: VehicleType.Trailer,
        priority: StoragePriority.Vehicle
    }
} as Record<StorageId, Omit<Storage, 'defaultPriority'>> as any;

export const ALL_STORAGES: Storage[] = [
    ...Object.values(SELF_STORAGES),
    ...Object.values(BUSINESS_SELF_STORAGES),
    FACTION_STORAGE,
    INVENTORY_STORAGE,
    BACKPACK_STORAGE,
    ...Object.values(VEHICLE_STORAGES)
];

ALL_STORAGES.forEach((s) => (s.defaultPriority = s.priority ?? DEFAULT_STORAGE_PRIORITY));
