import { setActivePinia, createPinia } from "pinia";
import useUserStore from "@/stores/user"
// import { auth } from '@/includes/firebase'
// /we do not need component to test store

vi.mock("@/includes/firebase/auth", () => ({
    auth: {
        signInWithEmailAndPassword: () => Promise.resolve(),
    }
})) // needed to test authanticate that provides third API like firebase (it can fail, so we need to make mock of firebase) we need fake dependencies

describe("stores", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    test("authenticate user", async () => {
        const store = useUserStore()

        expect(store.userLoggedIn).not.toBe(true)
        // await store.authenticate({}) 
        // required email and password to authenticate, we will mock it with Promise.resolve
        // expect(store.userLoggedIn).toBe(true)
    })
})
