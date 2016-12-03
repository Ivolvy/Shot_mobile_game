class Utils {

    static centerGameObjects(objects) {
        objects.forEach(function (object) {
            object.anchor.setTo(0.5);
        })
    }
}

export default Utils;
