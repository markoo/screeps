global.HARVESTERS_DESIRED =        {'Markopolis': 2, 'Stevenopolis': 2, 'Alanopolis': 2, 'Thomasopolis': 1, 'Michaelopolis': 2, 'Josephineopolis': 2, 'Eliseopolis': 2, 'Fionaopolis': 2, 'Camillaopolis': 2, 'Meinkeopolis': 2}
global.UPGRADERS_DESIRED =         {'Markopolis': 1, 'Stevenopolis': 1, 'Alanopolis': 1, 'Thomasopolis': 1, 'Michaelopolis': 1, 'Josephineopolis': 1, 'Eliseopolis': 1, 'Fionaopolis': 1, 'Camillaopolis': 2, 'Meinkeopolis': 1}
global.BUILDERS_DESIRED =          {'Markopolis': 1, 'Stevenopolis': 1, 'Alanopolis': 1, 'Thomasopolis': 1, 'Michaelopolis': 1, 'Josephineopolis': 1, 'Eliseopolis': 1, 'Fionaopolis': 1, 'Camillaopolis': 1, 'Meinkeopolis': 1}
global.TRANSFERERS_DESIRED =       {'Markopolis': 1, 'Stevenopolis': 1, 'Alanopolis': 1, 'Thomasopolis': 1, 'Michaelopolis': 1, 'Josephineopolis': 1, 'Eliseopolis': 1, 'Fionaopolis': 1, 'Camillaopolis': 1, 'Meinkeopolis': 2}
global.DEFENDERS_DESIRED =         {'Markopolis': 0, 'Stevenopolis': 0, 'Alanopolis': 0, 'Thomasopolis': 0, 'Michaelopolis': 0, 'Josephineopolis': 0, 'Eliseopolis': 0, 'Fionaopolis': 0}
global.MINERS_DESIRED =            {'Markopolis': 0, 'Stevenopolis': 0, 'Alanopolis': 0, 'Thomasopolis': 0, 'Michaelopolis': 0, 'Josephineopolis': 0, 'Eliseopolis': 0, 'Fionaopolis': 0, 'Camillaopolis': 0, 'Meinkeopolis': 1}
global.REMOTE_UPGRADERS_DESIRED =  {'Markopolis': 0, 'Stevenopolis': 1, 'Alanopolis': 0, 'Thomasopolis': 0, 'Michaelopolis': 0, 'Josephineopolis': 0, 'Eliseopolis': 0, 'Fionaopolis': 0}
global.MEGA_TRANSFERERS_DESIRED =  {'Markopolis': 0, 'Stevenopolis': 0, 'Alanopolis': 0}
global.REMOTE_HARVESTERS_DESIRED = {'Markopolis': 0, 'Stevenopolis': 0}
global.MEGA_UPGRADERS_DESIRED =    {'Markopolis': 0, 'Stevenopolis': 0, 'Alanopolis': 0}
global.CLAIMERS_DESIRED =          {'Markopolis': 0, 'Stevenopolis': 0, 'Alanopolis': 0, 'Thomasopolis': 0, 'Michaelopolis': 0, 'Josephineopolis': 0, 'Eliseopolis': 0, 'Fionaopolis': 0}
global.INVADERS_DESIRED =          {'Markopolis': 0, 'Stevenopolis': 0, 'Alanopolis': 0}

// RCL2 energy = 550
// RCL3 energy = 800
// RCL4 energy = 1300
// RCL5 energy = 1800
// RCL6 energy = 2300
// RCL7 energy = 5600
// RCL8 energy = 12900
// BODY CALC : https://codepen.io/findoff/details/RPmqOd
// MOVE*15,WORK*10,CARRY*20

// https://github.com/bonzaiferroni/screepswiki/wiki/%23cpu-clinic-faq

let w10c20m15 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 2750
let w10c10m10 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 2000
let w08c08m08 = [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1600
let w07c07m07 = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                 WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; // 1400
let w06c06m06 = [WORK,WORK,WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; // 1200
let w05c05m05 = [WORK,WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE,MOVE]; // 1000
let w04c04m04 = [WORK,WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE,MOVE]; // 800
let w03c03m03 = [WORK,WORK,WORK,
                 CARRY,CARRY,CARRY,
                 MOVE,MOVE,MOVE]; // 600
let w02c02m02 = [WORK,WORK,
                 CARRY,CARRY,
                 MOVE,MOVE]; // 400
let w01c01m01 = [WORK,
                 CARRY,
                 MOVE]; // 200
             

global.HARVESTERS_BODY = {              'Markopolis':   w06c06m06,
                                        'Stevenopolis': w06c06m06,
                                        'Alanopolis':   w06c06m06,
                                        'Thomasopolis': w05c05m05,
                                        'Michaelopolis': w06c06m06,
                                        'Josephineopolis': w06c06m06,
                                        'Eliseopolis':   w06c06m06,
                                        'Fionaopolis': w06c06m06,
                                        'Camillaopolis': w06c06m06,
                                        'Meinkeopolis': w05c05m05}

global.BUILDERS_BODY = {                'Markopolis':   w07c07m07,
                                        'Stevenopolis': w07c07m07,
                                        'Alanopolis':   w07c07m07,
                                        'Thomasopolis': w04c04m04,
                                        'Michaelopolis': w05c05m05,
                                        'Josephineopolis': w05c05m05,
                                        'Eliseopolis':   w05c05m05,
                                        'Fionaopolis': w05c05m05,
                                        'Camillaopolis': w05c05m05,
                                        'Meinkeopolis': w05c05m05}

global.REMOTE_HARVESTERS_BODY = {       'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],}

global.MINERS_BODY = {                  'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   w05c05m05,
                                        'Thomasopolis': w05c05m05,
                                        'Michaelopolis': w05c05m05,'Josephineopolis': w05c05m05,'Eliseopolis': w05c05m05,
                                        'Meinkeopolis': w05c05m05}

global.UPGRADERS_BODY = {               'Markopolis':      [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis':    [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':      [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Thomasopolis':    [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Michaelopolis':   [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Josephineopolis': [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Eliseopolis':     [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Fionaopolis':     [WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], 
                                                           //[WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Camillaopolis':   w07c07m07,
                                        'Meinkeopolis': w05c05m05}

global.REMOTE_UPGRADERS_BODY = {        'Markopolis':   w06c06m06,
                                        'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   w05c05m05,
                                        'Thomasopolis': w04c04m04,
                                        'Michaelopolis': w05c05m05,
                                        'Fionaopolis': w05c05m05,
                                        'Josephineopolis': w05c05m05,}

global.MEGA_UPGRADERS_BODY = {          'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],}
global.DEFENDERS_BODY = {               'Markopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Thomasopolis': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Michaelopolis': [MOVE,MOVE,RANGED_ATTACK],
                                        'Josephineopolis': [MOVE,MOVE,RANGED_ATTACK],
                                        'Eliseopolis':  [MOVE,MOVE,RANGED_ATTACK],
                                        'Fionaopolis':  [MOVE,MOVE,RANGED_ATTACK],}
                                        
global.EMERGENCY_DEFENDERS_BODY = {     'Markopolis':   [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Thomasopolis': [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],}

global.CLAIMERS_BODY = {                'Markopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Thomasopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Michaelopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Fionaopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Josephineopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,HEAL,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],}

global.TRANSFERERS_BODY = {             'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                                        'Alanopolis':   [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                                        'Thomasopolis': w04c04m04,
                                        'Michaelopolis': w05c05m05,
                                        'Josephineopolis': w05c05m05,
                                        'Eliseopolis':   w05c05m05,
                                        'Fionaopolis': w05c05m05,
                                        'Camillaopolis': w03c03m03,
                                        'Meinkeopolis': w05c05m05}

global.MEGA_TRANSFERERS_BODY = {        'Markopolis':   w10c20m15,
                                        'Stevenopolis': w10c20m15,
                                        'Alanopolis':   [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],}

global.EMERGENCY_TRANSFERERS_BODY = {   'Markopolis':      [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Stevenopolis':    [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Alanopolis':      [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Thomasopolis':    [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Michaelopolis':   [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Josephineopolis': [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Eliseopolis':     [WORK,CARRY,CARRY,MOVE,MOVE],
                                        'Fionaopolis':     [WORK,CARRY,CARRY,MOVE,MOVE],}

global.INVADERS_BODY = {                'Markopolis':   [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Stevenopolis': [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Alanopolis':   [ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],
                                        'Thomasopolis': [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE],}

global.WALL_STRENGTH = {                'Markopolis':   WALL_HITS_MAX-295000,
                                        'Stevenopolis': WALL_HITS_MAX-198000,
                                        'Alanopolis':   WALL_HITS_MAX-125000,
                                        'Thomasopolis': WALL_HITS_MAX-  1000,}

global.RAMPART_STRENGTH = {             'W44N1': 300000000  -    2000,
                                        'W43N1':  30000000  -    1100,
                                        'W43N2': 100000000  -    1600,
                                        'W43N3': 300000000  -    3000,
                                        'W44N3': 300000000  -   20000,
                                        'W41S6': 300000000  -  80000000,
                                        'W41S7': 300000000  -  90000000,}

global.WALL_BUILDER_STRENGTH = {        'W44N1': WALL_HITS_MAX - 25000,
                                        'W43N1': WALL_HITS_MAX - 1000,
                                        'W43N2': WALL_HITS_MAX - 0,
                                        'W39S2': WALL_HITS_MAX - 50000,
                                        'W41S7': WALL_HITS_MAX - 350000,
                                        'W44N2': WALL_HITS_MAX - 600000,}
