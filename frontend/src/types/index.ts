export type ProjectStatus="draft"|"published"|"archived";
export interface Media{url:string;publicId:string}
export interface Project{_id:string;title:string;slug:string;description:string;shortDescription:string;techStack:string[];githubUrl:string;liveUrl:string;images:Media[];thumbnail:Media;status:ProjectStatus;featured:boolean;order:number;createdAt:string;updatedAt:string}
export interface Skill{_id:string;name:string;category:string;icon:string;order:number;isVisible:boolean;createdAt:string;updatedAt:string}
export type CurrentStatusType="learning"|"working"|"building"; export type CurrentStatusState="planning"|"in_progress"|"completed"|"paused";
export interface CurrentStatus{_id:string;title:string;description:string;type:CurrentStatusType;status:CurrentStatusState;order:number;isVisible:boolean;createdAt:string;updatedAt:string}
export interface User{_id:string;username:string;email:string;role:"admin"|"user";avatar?:string}
export interface Profile{_id:string;user:User;fullName:string;bio:string;title:string;location:string;phone:string;website:string;github:string;linkedin:string;twitter:string;avatar:Media;resumeUrl:Media}
export interface GithubProfile{login:string;name:string;avatar_url:string;html_url:string;bio:string|null;public_repos:number;followers:number;following:number;created_at:string}
export interface GithubRepo{name:string;html_url:string;description:string|null;stargazers_count:number;forks_count:number;language:string|null;updated_at:string}
export interface ContributionDay{date:string;contributionCount:number}; export interface GithubContributions{totalContributions:number;weeks:{contributionDays:ContributionDay[]}[]}
export interface LeetCodeDashboard{username:string;stats:{totalSolved:number;easySolved:number;mediumSolved:number;hardSolved:number;totalQuestions:number;easyTotal:number;mediumTotal:number;hardTotal:number;ranking:number};activity:{totalSubmissions:number;activeDays:number;submissionsByDate:Record<string,number>}}
