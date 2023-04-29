
async function createArtWorks(){
    let newUser1 = new User({
        email: "vhn",
        name: "ninh",
        passwordHash: "123",
    })
    let newUser2 = new User({
        email: "vhk",
        name: "khang",
        passwordHash: "123",
    })
    let newArtWork1 = new ArtWork({
        base64: "vhn",
        description: "artwork1",
        likes: 100,
    })
    let newArtWork2 = new ArtWork({
        base64: "vhk",
        description: "artwork2",
        likes: 100
    })
    await newUser1.save()
    await newUser2.save()
    await newArtWork1.save()
    await newArtWork2.save()
}