import { Accelatrix } from "accelatrix/accelatrix";

export module SerializationTests
{
    export function GetClassInstance()
    {
        return new SerializableClass("Test " + (new Date()).toString());
    }

    class BaseSerializableClass
    {
        @Accelatrix.Serialization.DataMember(false)
        private baseTime: Date = new Date();

        /** Field will be serialized and when deserialised the value will be retained. */
        @Accelatrix.Serialization.DataMember()
        public get Time(): Date
        {
            return this.baseTime;
        }
        public set Time(value: Date)
        {
            this.baseTime = value;
        }
    }

    @Accelatrix.Serialization.KnownType
    class SerializableClass extends BaseSerializableClass
    {
        /** Field will NOT be serialized. */
        @Accelatrix.Serialization.DataMember(false)
        private name: string;

        public constructor(name: string)
        {
            super();
            this.name = name;
        }

        /** Property will be serialized. */
        @Accelatrix.Serialization.DataMember()
        public get NameProp(): string
        {
            return this.name;
        }
        public set NameProp(value: string)
        {
            this.name = value;
        }

        @Accelatrix.Serialization.OnSerializing()
        private OnSerializing()
        {
            console.log("About to serialize");
        }

        @Accelatrix.Serialization.OnSerialized()
        private OnSerialized()
        {
            console.log("Serialized complete.");
        }

        @Accelatrix.Serialization.OnDeserializing()
        private OnDeserializing()
        {
            console.log("About to deserialize");
        }

        @Accelatrix.Serialization.OnDeserialized()
        private OnDeserialized()
        {
            console.log("Deserialization complete.");
        }
    }
}
