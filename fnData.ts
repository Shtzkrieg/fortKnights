export module fnData {

    export enum Result { Dub = "Dub", 
        L = "L", 
        Cheaters = "Cheaters", 
        Disconnect = "Disconnect", 
        Report = "Report", 
        Other = "Other"};

    export enum NamedLocation {
        Logjam_Lumberyard = "Logjam Lumberyard",
        Sleepy_Sound = "Sleepy Sound",
        Shifty_Shafts = "Shifty Shafts",
        Camp_Cuddle = "Camp Cuddle",
        Coney_Crossroads = "Coney Crossroads",
        Daily_Bugle = "Daily Bugle",
        Sanctuary = "Sanctuary",
        Greasy_Grove = "Greasy Grove",
        Rocky_Reels = "Rocky Rocks",
        The_Joneses = "The Joneses",
        Chonkers_Speedway = "Chonkers Speedway",
        Condo_Canyon = "Condo Canyon"
    }

    export type Path = 
        | {Point: NamedLocation}
        | {PointArr: NamedLocation[]}

    export type MatchRecord = 
        | {Result: Result, Path: Path, Kills: number}
        | {Result: Result, Path: Path}

}