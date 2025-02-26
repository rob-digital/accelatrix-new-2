export namespace Bio
{
    export enum TypesOfLocomotion
    {
        Crawl,
        Swim,
        Walk,
        Fly,
    }

    abstract class LivingBeing
    {
        public isExtinct = false;
    }

    export abstract class Eukaryotes extends LivingBeing
    {
        private locomotion: TypesOfLocomotion = null;

        public get Locomotion(): TypesOfLocomotion
        {
            return this.locomotion;
        }
        public set Locomotion(value: TypesOfLocomotion)
        {
            this.locomotion = value;
        }
    }

    export class Animal extends Eukaryotes
    {
        public isAnimal = true;

        public constructor()
        {
            super();
        }
    }

    export class Mammal extends Animal
    {
        private readonly numberOfTits: number;

        public constructor(numberOfTits: number)
        {
            super();
            this.numberOfTits = numberOfTits;
        }

        public get NumberOfTits(): number
        {
            return this.numberOfTits;
        }

        public SayHello(): string
        {
            return "Hello";
        }
    }

    export class Feline extends Mammal
    {
        private readonly numberOfLives: number;

        public constructor(numberOfTits: number, numberOfLives: number)
        {
            super(numberOfTits);
            this.numberOfLives = numberOfLives == null ? 9 : numberOfLives;
            this.Locomotion = TypesOfLocomotion.Walk;
        }

        public get NumberOfLives(): number
        {
            return this.numberOfLives;
        }
    }
}
