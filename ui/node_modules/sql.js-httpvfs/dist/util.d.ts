export declare type SegmentUUID = string & {
    __segmentUUIDBrand: unknown;
};
export declare type VideoID = string & {
    __videoIDBrand: unknown;
};
export declare type VideoDuration = number & {
    __videoDurationBrand: unknown;
};
export declare type Category = string & {
    __categoryBrand: unknown;
};
export declare type VideoIDHash = VideoID;
export declare type IPAddress = string & {
    __ipAddressBrand: unknown;
};
export declare type HashedIP = IPAddress;
declare type SBRecord<K extends string, T> = {
    [P in string | K]: T;
};
export declare enum Service {
    YouTube = "YouTube",
    PeerTube = "PeerTube"
}
export interface IncomingSegment {
    category: Category;
    segment: string[];
}
export interface Segment {
    category: Category;
    segment: number[];
    UUID: SegmentUUID;
    videoDuration: VideoDuration;
}
export declare enum Visibility {
    VISIBLE = 0,
    HIDDEN = 1
}
export interface DBSegment {
    category: Category;
    startTime: number;
    endTime: number;
    UUID: SegmentUUID;
    votes: number;
    locked: boolean;
    shadowHidden: Visibility;
    videoID: VideoID;
    videoDuration: VideoDuration;
    hashedVideoID: VideoIDHash;
}
export interface OverlappingSegmentGroup {
    segments: DBSegment[];
    votes: number;
    locked: boolean;
}
export interface VotableObject {
    votes: number;
}
export interface VotableObjectWithWeight extends VotableObject {
    weight: number;
}
export interface VideoData {
    hash: VideoIDHash;
    segments: Segment[];
}
export interface SegmentCache {
    shadowHiddenSegmentIPs: SBRecord<VideoID, {
        hashedIP: HashedIP;
    }[]>;
    userHashedIP?: HashedIP;
}
export declare function chooseSegments(segments: DBSegment[]): DBSegment[];
export {};
