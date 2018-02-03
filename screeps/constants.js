global.HARVESTERS_DESIRED =        { 'Markopolis':   2, 'Stevenopolis': 2, 'Alanopolis':   2, }
global.REMOTE_HARVESTERS_DESIRED = { 'Markopolis':   0, 'Stevenopolis': 0, }

global.UPGRADERS_DESIRED =         { 'Markopolis':   1, 'Stevenopolis': 1, 'Alanopolis':   1, }
global.REMOTE_UPGRADERS_DESIRED =  { 'Markopolis':   0, 'Stevenopolis': 1, }

global.DEFENDERS_DESIRED =         { 'Markopolis':   1, 'Stevenopolis': 1, 'Alanopolis':   1, }

global.MINERS_DESIRED =            { 'Markopolis':   0, 'Stevenopolis': 0, }

global.CLAIMERS_DESIRED =          { 'Markopolis':   0, 'Stevenopolis': 0, }

global.TRANSFERERS_DESIRED =       { 'Markopolis':   1, 'Stevenopolis': 1, 'Alanopolis':   1, }
global.MEGA_TRANSFERERS_DESIRED =  { 'Markopolis':   0, 'Stevenopolis': 1, 'Alanopolis':   0, }

global.HARVESTERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Alanopolis':   [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
}
global.REMOTE_HARVESTERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
}
global.MINERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
}
global.UPGRADERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Alanopolis':   [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
}
global.REMOTE_UPGRADERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
}
global.DEFENDERS_BODY = {
    'Markopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                     RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Alanopolis':   [RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,MOVE,MOVE,MOVE],
}
global.CLAIMERS_BODY = {
    'Markopolis':   [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                     RANGED_ATTACK,
                     ATTACK,
                     HEAL,
                     CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                     RANGED_ATTACK,
                     ATTACK,
                     HEAL,
                     CLAIM,
                     MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
}
global.TRANSFERERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Alanopolis':   [WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
}
global.MEGA_TRANSFERERS_BODY = {
    'Markopolis':   [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Stevenopolis': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
    'Alanopolis':   [WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],
}
global.EMERGENCY_TRANSFERERS_BODY = {
    'Markopolis':   [WORK,CARRY,CARRY,MOVE,MOVE],
    'Stevenopolis': [WORK,CARRY,CARRY,MOVE,MOVE],
    'Alanopolis':   [WORK,CARRY,CARRY,MOVE,MOVE],
}
global.WALL_STRENGTH = {
    'Markopolis':   WALL_HITS_MAX-190000,
    'Stevenopolis': WALL_HITS_MAX-150000,
    'Alanopolis':   WALL_HITS_MAX- 33000,
}
global.WALL_BUILDER_STRENGTH = {
    'W43N1': WALL_HITS_MAX - 1000,
    'W43N2': WALL_HITS_MAX - 0,
    'W43N3': WALL_HITS_MAX - 0,
    
}
global.RAMPART_STRENGTH = {
    'W43N1': 3000000   -   50000,
    'W43N2': 30000000  - 1000000,
    'W43N3': 100000000 -  250000,
}
